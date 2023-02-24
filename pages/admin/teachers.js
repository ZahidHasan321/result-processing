import AntDesignGrid from "@/component/customDatagrid/customDatagrid";
import TeacherDialog from "@/component/dialog/TeacherDialog";
import Layout from "@/component/layout/layout";
import { AdminPages } from "@/constants/routes";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { Box, Button, Grow, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const Teachers = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(null)
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

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
      minWidth: 250
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
      minWidth: 250
    },
    {
      field: "department",
      headerName: "Department",
      minWidth: 150,
      flex: 1
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 90,
      renderCell: (params) => {
        return (
          <Button variant='contained' sx={{ bgcolor: '#b71c1c', ":hover": { bgcolor: '#b71c1c' } }} onClick={(event) => {  event.preventDefault(); handleDeleteRow(event, params) }}>
            <DeleteForever />
          </Button>
        )
      }
    }

  ]

  if (loading) return <div>loading</div>

  return (
    <Paper  variant="outlined" sx={{ m: 6, boxShadow: 3, minHeight:400}}>
      <Typography fontSize={30} sx={{ ml: 4, mt: 2 }}>Teachers</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 4, mr: 4, mb: 3 }}>
        <Button sx={{ ml: 'auto', mb: 3, boxShadow: 1, bgcolor:'#67be23', ":hover":{bgcolor:'#67be23'} }} variant="contained" onClick={handleAddTeacher}>Add Teacher</Button>
       
         <AntDesignGrid
            sx={{ boxShadow: 3 }}
            checked={checked}
            columns={columns}
            rows={list}
            disableSelectionOnClick
            autoHeight
          />
        {open && <TeacherDialog open={open} onClose={handleOnClose} />}
      </Box>
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