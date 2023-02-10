import TeacherDialog from "@/component/dialog/TeacherDialog";
import DrawerLayout from "@/component/layout/drawerLayout";
import { AdminPages } from "@/constants/routes";
import {DeleteForever} from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import {DataGrid} from "@mui/x-data-grid/DataGrid";
import { useEffect, useState } from "react";

const Teachers = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    const getList = async() => {
      
      await fetch('/api/admin/teacherList')
      .then(res => res.json())
      .then(data => setList(data));
      
    }

    useEffect(() => {
      setLoading(true);
      getList()
      setLoading(false)
  },[])

    const handleDeleteRow = async(e, params) =>
    {
      await fetch('/api/admin/deleteTeacher',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(params.row.id)
      })
      getList();
    }

const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex:1
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex:1
    },
    {
      field: "phone",
      headerName: "Phone",
      minWidth: 200,
      flex:1
    },
    {
      field: "department",
      headerName: "Department",
      minWidth: 200,
      flex:1
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 90,
      renderCell: (params) => {
        return(
        <Button onClick={(event) => {handleDeleteRow(event, params)}}>
          <DeleteForever sx={{color:'text.primary'}}/>
        </Button>
        )
     }
    }
    
  ]

  const handleOnClose = () =>{
    setOpen(false);
  }
  const handleAddTeacher = () => {
      setOpen(true);
  }

    return(
        <Box>
          <Box sx={{display:'flex', }}>
            <Button onClick={handleAddTeacher}>Add Teacher</Button>
          </Box>
            <Box sx={{width:"100%", m: "10px", pr:"30px", height:500}}>
            <DataGrid 
            columns={columns}
            rows={list}
            
            disableSelectionOnClick
            />
            </Box>
            <TeacherDialog open={open} onClose={handleOnClose} list={list}/>
        </Box>
    )
}

Teachers.getLayout = function getLayout(page){
  return(
      <DrawerLayout pages={AdminPages}>
          <main>{page}</main>
      </DrawerLayout>
  )
}
export default Teachers;