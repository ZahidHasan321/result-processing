import TeacherDialog from "@/component/dialog/TeacherDialog";
import Layout from "@/component/layout/layout";
import { AdminPages } from "@/constants/routes";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useEffect, useState } from "react";

const Teachers = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(null)
  const [open, setOpen] = useState(false);


  const getList = async () => {
    fetch('/api/admin/teacherList')
      .then(res =>res.json())
      .then(data => setList(data));
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
          <Button onClick={(event) => { handleDeleteRow(event, params) }}>
            <DeleteForever sx={{ color: 'text.primary' }} />
          </Button>
        )
      }
    }

  ]

  if (loading) return <div>loading</div>

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', m: 2, mt:4.5, ml:4,mr:4 }}>
      <Button sx={{ ml: 'auto', mb: 2, boxShadow:1 }} variant="outlined" onClick={handleAddTeacher}>Add Teacher</Button>

      <DataGrid
        sx={{ boxShadow: 1, }}
        columns={columns}
        rows={list}
        disableSelectionOnClick
        hideFooter
        autoHeight
      />
      {open && <TeacherDialog open={open} onClose={handleOnClose} />}
    </Box>
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