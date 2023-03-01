import AntDesignGrid from "@/component/customDatagrid/customDatagrid";
import TeacherDialog from "@/component/dialog/TeacherDialog";
import Layout from "@/component/layout/layout";
import { AdminPages } from "@/constants/routes";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useState } from "react";

const Teachers = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(null)
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [snackbar, setSnackbar] = useState(null);

  const getList = async () => {
    fetch('/api/admin/teacherList')
      .then(res => res.json())
      .then(data => {
        setList(data);
        setChecked(true);
      });
  }


  const handleDeleteRow = async (e, params) => {
    await fetch('/api/admin/deleteTeacher', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params.row.id)
    })
    getList();
  }

  const handleOnClose = () => {
    getList();
    setOpen(false);
  }
  const handleAddTeacher = () => {
    setOpen(true);
  }

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
      flex: 1
    },
    {
      field: "phone",
      headerName: "Phone",
      minWidth: 250,
      editable: true
    },
    {
      field: "department",
      headerName: "Department",
      minWidth: 150,
      flex: 1,
      editable: true
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 90,
      renderCell: (params) => {
        return (
          <Button variant='contained' sx={{ bgcolor: '#b71c1c', ":hover": { bgcolor: '#b71c1c' } }} onClick={(event) => { event.preventDefault(); handleDeleteRow(event, params) }}>
            <DeleteForever />
          </Button>
        )
      }
    }
  ]

  const processRowUpdate = (newRow, oldRow) => {
    if(JSON.stringify(newRow) === JSON.stringify(oldRow)) return oldRow;

    if (newRow.name != '') {
      fetch('/api/admin/updateTeacher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email:newRow.email, name: newRow.name, phone: newRow.phone, dept: newRow.department, id:newRow.id })
      })
        .then(res => res.json())
        .then(data => {
          if (data.command == "UPDATE") {
            setSnackbar({ children: 'Teacher data updated', severity: "success" })
          }
          else{
            setSnackbar({ children: 'Failed to update', severity: "error" })
          }
        });

        return newRow;
    }
    else{
      setSnackbar({ children: 'Name cannot be empty', severity: "error" })
      return oldRow;
    }
  }

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  if (loading) return <div>loading</div>

  return (
    <Paper variant="outlined" sx={{ boxShadow: 3, minHeight: 400 }}>
      <Typography fontSize={30} sx={{ ml: 4, mt: 2 }}>Teachers</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4, mr: 4, mb: 3 }}>
        <Button sx={{ ml: 'auto', mb: 3, boxShadow: 1, bgcolor: '#67be23', ":hover": { bgcolor: '#67be23' } }} variant="contained" onClick={handleAddTeacher}>Add Teacher</Button>

        <AntDesignGrid
          sx={{ boxShadow: 3 }}
          checked={checked}
          columns={columns}
          rows={list}
          disableSelectionOnClick
          autoHeight
          experimentalFeatures={{ newEditingApi: true }}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
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

Teachers.getLayout = function getLayout(page) {
  return (
    <Layout pages={AdminPages}>
      <main>{page}</main>
    </Layout>
  )
}
export default Teachers;