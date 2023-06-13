import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { GridActionsCellItem, GridRowModes, GridToolbar } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import AntDesignGrid from "../customDatagrid/customDatagrid";
import UploadStudentDialog from "../dialog/uploadStudentDialog";
import AutoCompleteSession from "../selector/autocompleteSession";
import SemesterSelector from "../selector/semesterSelector";


const StudentList = () => {
  const [studentList, setStudentList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [sessionList, setSessionList] = useState([]);
  const [semesterList, setSemesterList] = useState([]);
  const [session, setSession] = useState('');
  const [semester, setSemester] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    fetch('/api/admin/student/deleteStudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "Success") {
          setSnackbar({ children: data.message, severity: "success" })
        }
        else {
          setSnackbar({ children: data.message, severity: "error" })
        }
      });
    setStudentList(studentList.filter((row) => row.roll !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = studentList.find((row) => row.roll === id);
    if (editedRow.isNew) {
      setRows(studentList.filter((row) => row.roll !== id));
    }
  };

  const columns = [
    {
      field: "roll",
      headerName: "ID",
      minWidth: 200,
      flex: 1
    },
    {
      field: "name",
      minWidth: 200,
      flex: 1,
      editable: true,
    },
    {
      field: "hall",
      headerName: "Hall",
      minWidth: 200,
      flex: 1,
      editable: true
    },
    {
      field: "improve",
      headerName: "Improvement",
      type: 'boolean',
      minWidth: 200,
      flex: 1,
      editable: true
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];


  const getSessionList = () => {
    fetch('/api/admin/student/getStudentSession')
      .then(res => res.json())
      .then(data => setSessionList(data))
  }

  const getSemesterList = () => {
    if (session == '') return;
    fetch('/api/admin/student/getSemesterList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(session)
    })
      .then(res => res.json())
      .then(data => setSemesterList(data))
  }

  useEffect(() => {
    if (session == '' || semester == '') {
      setStudentList([]);
      return;
    }

    fetch('/api/admin/student/getStudentData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ session, semester })
    })
      .then(res => res.json())
      .then(data => setStudentList(data))
  }, [semester])


  useEffect(() => {
    if (session != '')
      getSemesterList();
    else {
      setSemester('');
    }
  }, [session])

  useEffect(() => {
    getSessionList();
  }, [])

  setTimeout(() => {
    setChecked(true);
  }, 200)

  const handleUpdateSemester = () => {
    if (studentList.length > 0)
      setOpenDialog(true);
    else {
      setSnackbar({ children: 'No data found', severity: 'error' })
    }
  }



  const processRowUpdate = (newRow, oldRow) => {
    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) return oldRow;

    if (newRow.name != '' && newRow.hall != '' && newRow.roll != '') {
      setStudentList(studentList.map(x => x.roll === newRow.roll ? newRow : x));
      fetch('/api/admin/student/updateStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: newRow.roll, name: newRow.name, hall: newRow.hall, improve: newRow.improve, session: session, semester: semester })
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === "Success") {
            setSnackbar({ children: 'Student data updated', severity: "success" })
          }
          else {
            setSnackbar({ children: 'Failed to update', severity: "error" })
          }
        });
    }

    return newRow;
  }

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  return (
    <Box sx={{ m: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Box sx={{ display: "flex", mb: 3 }}>
        <AutoCompleteSession sx={{ width: '180px' }} list={sessionList} onChange={(value) => setSession(value)} label='Exam Session' />
        <SemesterSelector sx={{ width: '180px', ml: 3 }} value={semester} list={semesterList} onChange={value => setSemester(value)} label='semester' />
        <Box sx={{ ml: 'auto', pl: 3 }}>
          <Button size="small" variant="contained" sx={{ bgcolor: '#67be23', ":hover": { bgcolor: '#67be23' } }} onClick={handleUpdateSemester}> Update semester</Button>
        </Box>
      </Box>
      <AntDesignGrid
        sx={{ boxShadow: 3, fontSize: '16px' }}
        autoHeight
        checked={checked}
        rows={studentList}
        columns={columns}
        experimentalFeatures={{ newEditingApi: true }}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        getRowId={(row) => row.roll}
        disableColumnSelector
        disableDensitySelector
        component={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            csvOptions: { disableToolbarButton: true },
            printOptions: { disableToolbarButton: true },
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 250 },
          },
        }}
      />

      {studentList.length > 0 && openDialog && <UploadStudentDialog list={studentList} open={openDialog} onClose={(value) => { setOpenDialog(false); setSnackbar(value); value && getSessionList() }} />}
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={() => { setSnackbar(null) }}
          autoHideDuration={3000}
        >
          <Alert {...snackbar} onClose={(() => { setSnackbar(null) })} />
        </Snackbar>
      )}
    </Box>
  )
}
export default StudentList;