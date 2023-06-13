import AntDesignGrid from "@/component/customDatagrid/customDatagrid";
import TeacherDialog from "@/component/dialog/TeacherDialog";
import Layout from "@/component/layout/layout";
import { AdminPages } from "@/constants/routes";
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import { GridActionsCellItem, GridRowModes, GridToolbar } from "@mui/x-data-grid";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useCallback, useEffect, useState } from "react";

const Teachers = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(null)
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [rowModesModel, setRowModesModel] = useState({});

  const getList = async () => {
    fetch('/api/admin/teacherList')
      .then(res => res.json())
      .then(data => {
        setList(data);
        setChecked(true);
      });
  }

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleOnClose = () => {
    getList();
    setOpen(false);
  }
  const handleAddTeacher = () => {
    setOpen(true);
  }

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
    fetch('/api/admin/deleteTeacher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id)
    })
      .then(res => res.json())
      .then(data => {
        setSnackbar({ children: data.message, severity: data.status })

      });
    setList(list.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,

      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = list.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(list.filter((row) => row.id !== id));
    }
  };

  useEffect(() => {
    setLoading(true)
    getList()
    setLoading(false)
  }, [])

  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 250,
      editable: true
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
      editable: true
    },
    {
      field: "phone",
      headerName: "Phone",
      minWidth: 300,
      editable: true
    },
    {
      field: "department",
      headerName: "Department",
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
  ]

  const processRowUpdate = (newRow, oldRow) => {
    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) return oldRow;

    if (newRow.name != '' && newRow.department != '') {
      setList(list.map(x => x.id === newRow.id ? newRow : x));
      fetch('/api/admin/updateTeacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: newRow.email, name: newRow.name, phone: newRow.phone, dept: newRow.department, id: newRow.id })
      })
        .then(res => res.json())
        .then(data => {
          if (data.command == "UPDATE") {
            setSnackbar({ children: 'Teacher data updated', severity: "success" })
          }
          else {
            setSnackbar({ children: 'Failed to update', severity: "error" })
          }
        });

      return newRow;
    }
    else {
      setSnackbar({ children: 'Cannot be empty', severity: "error" })
      return oldRow;
    }
  }

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  return (
    <Paper variant="outlined" sx={{ boxShadow: 3, minHeight: 400 }}>
      <Typography fontSize={30} sx={{ ml: 4, mt: 2 }}>Teachers</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4, mr: 4, mb: 3 }}>
        <Button sx={{ ml: 'auto', mb: 3, boxShadow: 1, bgcolor: '#67be23', ":hover": { bgcolor: '#67be23' } }} variant="contained" onClick={handleAddTeacher}><AddIcon /> Add Teacher</Button>

        <AntDesignGrid
          sx={{ boxShadow: 3, fontSize: '16px' }}
          checked={checked}
          columns={columns}
          rows={list}
          disableSelectionOnClick
          autoHeight
          experimentalFeatures={{ newEditingApi: true }}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
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
        {open && <TeacherDialog open={open} onClose={handleOnClose} />}
      </Box>
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
    </Paper>
  )
}

Teachers.getLayout = function getLayout({ children }) {
  const { status, data } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === 'unauthenticated') {
    Router.replace('/auth/signin');
  }

  if (status === 'authenticated' && data.user.role !== 'Chairman') {
    Router.replace('/accessDenied');
  }
  return (
    <Layout pages={AdminPages} idx={1}>
      <main>{children}</main>
    </Layout>
  )
}
export default Teachers;