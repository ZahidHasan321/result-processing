import CommitteeDialog from "@/component/dialog/committeeDialog";
import DrawerLayout from "@/component/layout/drawerLayout";
import { AdminPages } from "@/constants/routes";
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import {DataGrid} from "@mui/x-data-grid/DataGrid";
import { useEffect, useState } from "react";

  

const Home = () => {
const [semester, setSemester] = useState("");
const [semesterList, setSemesterList] = useState([]);
const [sessionList, setSessionList] = useState([]);
const [loading, setLoading] = useState(false);
const [session, setSession] = useState("")
const [committeeList, setCommitteeList] = useState([]);
const [open, setOpen] = useState(false)

function handleClose()
{
    setOpen(false);
}


const handleSessionChange = (e) => {
    setSession(e.target.value);
}

function handleSemesterChange(e)
{
    setSemester(e.target.value)
}
const handleCreateCommittee = () => {
    setOpen(true);
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
      field: "role",
      headerName: "Role",
      minWidth: 200,
      flex:1
    },
  ]
const getSessionList = async() => {
    setLoading(true);
    fetch('/api/admin/sessionList')  
    .then(res => res.json())
    .then(data => setSessionList(data))
    setLoading(false);
}
useEffect(() => {
    getSessionList();
},[])

useEffect(()=> {
    if(semester != '' && session != ''){
        fetch('/api/admin/committeeList', {
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({session, semester})
        })
        .then(res => res.json())
        .then(data => setCommitteeList(data));
    }
},[semester])

useEffect(() => {
    if(session != ''){
        fetch('/api/admin/semesterList',{
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify(session)
        })
        .then(res => res.json())
        .then(data => setSemesterList(data))
        
    }
    else if(session == ''){
        setSemesterList([]);
    }
},[session])

if(loading) <div>loading</div>

return(
    <Box>
        <Box sx={{ mt:"30px", display:'flex'}}>
            <Box sx={{width:'150px'}}>
            <FormControl fullWidth>
            <InputLabel id="session-select-label">Sesssion</InputLabel>
            {sessionList && <Select
            labelId="session-select-label"
            id="session-select"
            label="Session"
            value={session || ''}
            onChange={handleSessionChange}
            >
                <MenuItem key={'none'} value=''><em>None</em></MenuItem>
                {
                    sessionList.map((session, idx) => {
                        return(
                        <MenuItem key={idx} value={session.exam_session}> {session.exam_session} </MenuItem>
                        )
                        })
                }
            </Select>}
        </FormControl>
        </Box>
        <Box sx={{width:'150px'}}>
        <FormControl fullWidth>
        <InputLabel id="Semester-select-label">Semester</InputLabel>
        {semesterList && <Select
          labelId="Semester-select-label"
          id="semester-select"
          label="Semester"
          value={semester || ''}
          onChange={handleSemesterChange}
        >
            <MenuItem key={'none'} value=''><em>None</em></MenuItem>
                {
                    semesterList.map((sem, idx) => {
                        return(
                        <MenuItem key={idx} value={sem.semester}> {sem.semester} </MenuItem>
                        )
                        })
                }
        </Select>}
        </FormControl>
        </Box>
        <Button variant="contained" onClick={handleCreateCommittee}>Create Committee</Button>
      </Box>
      
      <DataGrid 
      columns={columns}
      rows={committeeList}
      autoHeight
      />

        <CommitteeDialog open={open} onClose={handleClose}/>
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