import AntDesignGrid from "@/component/customDatagrid/customDatagrid";
import CourseDialog from "@/component/dialog/CourseDialog";
import Layout from "@/component/layout/layout";
import SemesterSelector from "@/component/selector/semesterSelector";
import { AdminPages } from "@/constants/routes";

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";


import { useCallback, useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useSession } from "next-auth/react";
import { signOut } from 'next-auth/react';



const Courses = () => {

  const userSession = useSession()

  const [semesterList, setSemesterList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(null);
  const [semester, setSemester] = useState('');
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [rowModesModel, setRowModesModel] = useState({});
  const [snackbar, setSnackbar] = useState(null);

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
    fetch('/api/admin/courses/deleteCourse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id)
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
    setCourseList(courseList.filter((row) => row.course_code !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,

      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = courseList.find((row) => row.course_code === id);
    if (editedRow.isNew) {
      setRows(courseList.filter((row) => row.course_code !== id));
    }
  };

  const columns = [
    {
      field: "course_code",
      headerName: "Course Code",
      minWidth: 300
    },
    {
      field: "course_name",
      headerName: "Course Name",
      minWidth: 200,
      flex: 1,
      editable: true
    },
    {
      field: "course_credit",
      headerName: "Course Credit",
      minWidth: 250,
      editable: true
    },
    {
      field: "course_type",
      headerName: "Course Type",
      minWidth: 200,
      editable: true
    },
    {
      field: "max_mark",
      headerName: "Course Mark",
      minWidth: 200,
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

    if (newRow.course_code != '' && newRow.course_name != '' && newRow.course_credit != '' && newRow.max_mark != '') {
      setCourseList(courseList.map(x => x.course_code === newRow.course_code ? newRow : x));
      fetch('/api/admin/courses/updateCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: newRow.course_code, name: newRow.course_name, credit: newRow.course_credit, mark: newRow.max_mark, type: newRow.course_type })
      })
        .then(res => res.json())
        .then(data => {
          setSnackbar({ children: data.message, severity: data.status })
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

  const handleClose = () => {
    getSemesterList()
    if (semester != '')
      getCourseList()
    setOpen(false);
  }

  const getSemesterList = async () => {
    setLoading(true)
    await fetch('/api/admin/courses/semesterList')
      .then(res => res.json())
      .then(data => {
        setSemesterList(data)
      })
    setLoading(false)
  }

  const getCourseList = async () => {
    await fetch('/api/admin/courses/courseList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(semester)
    })
      .then(res => res.json())
      .then(data => {
        setCourseList(data)
      })
    setChecked(true);
  }

  useEffect(() => {
    if (semester != '') {
      getCourseList();

    }
    else {
      setCourseList([])
      setChecked(false)
    }
  }, [semester])

  useEffect(() => {
    getSemesterList();
  }, [])

  if (userSession.status === "loading") {
    return <p>Loading...</p>
  }

  else if (userSession.status === 'unauthenticated' || userSession.data.user.role !== 'Chairman') {
    return (
      <>
        <h1>Access Denied</h1>
        <Button onClick={() => signOut({ callbackUrl: '/auth/signin' })}>Signout</Button>
      </>
    )
  }
  else {
    return (
      <Paper variant="outlined" sx={{ boxShadow: 3, minHeight: 400 }}>
        <Typography fontSize={30} sx={{ ml: 4, mt: 2 }}>Courses</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', m: 2, mr: 4, ml: 4, mb: 3 }}>
          <Typography variant="caption" sx={{ mb: 1 }}>Choose a session and a semester</Typography>
          <Box sx={{ display: 'flex', mb: 2 }}>
            <SemesterSelector sx={{ width: '180px' }} list={semesterList} value={semester} onChange={(value) => setSemester(value)} label='semester' />

            <Button variant="contained" onClick={() => setOpen(true)} sx={{ ml: 'auto', alignSelf: 'flex-end', bgcolor: '#67be23', ":hover": { bgcolor: '#67be23' } }}><AddIcon /> Add Course</Button>
          </Box>

          <AntDesignGrid
            sx={{ boxShadow: 3, fontSize: '16px' }}
            columns={columns}
            checked={checked}
            rows={courseList}
            getRowId={row => row.course_code}
            autoHeight
            hideFooter
            experimentalFeatures={{ newEditingApi: true }}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStart={handleRowEditStart}
            onRowEditStop={handleRowEditStop}
          />
          <CourseDialog open={open} onClose={handleClose} />
        </Box>
        {
          !!snackbar && (
            <Snackbar
              open
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              onClose={() => { setSnackbar(null) }}
              autoHideDuration={3000}
            >
              <Alert {...snackbar} onClose={(() => { setSnackbar(null) })} />
            </Snackbar>
          )
        }
      </Paper>
    )
  }
}

Courses.getLayout = function getLayout(page) {
  return (
    <Layout pages={AdminPages}>
      <main>{page}</main>
    </Layout>
  )
}

export default Courses;