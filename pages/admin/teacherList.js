import TeacherDialog from "@/component/dialog/TeacherDialog";
import DrawerLayout from "@/component/layout/drawerLayout";
import Layout from "@/component/layout/layout";
import { AdminPages } from "@/constants/routes";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const Home = () => {
    const [list, setList] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch('/api/admin/teacherList')
        .then(res => res.json())
        .then(data => setList(data));
    },[])


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
      field: "role",
      headerName: "Role",
      minWidth: 200,
      flex:1
    },
  ]

  const handleOnClose = () =>{
    setOpen(false);
  }
  const handleAddTeacher = () => {
      setOpen(true);
  }

    if(!list) return <>loading</>

    return(
        <Box>
          <Box sx={{display:'flex', }}>
            <Button onClick={handleAddTeacher}>Add Teacher</Button>
          </Box>
            <Box sx={{width:"100%", m: "30px", pr:"80px"}}>
            <DataGrid 
            columns={columns}
            rows={list}
            autoHeight
            />
            </Box>
            <TeacherDialog open={open} onClose={handleOnClose}/>
        </Box>
        
    )
}

Home.getLayout = function getLayout(page){
  return(
      <DrawerLayout pages={AdminPages}>
          <main>{page}</main>
      </DrawerLayout>
  )
}
export default Home;