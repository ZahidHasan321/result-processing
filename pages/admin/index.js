import CommitteeDialog from "@/component/dialog/committeeDialog";
import ConfirmDialog from "@/component/dialog/ConfirmDialog";
import Layout from "@/component/layout/layout";
import { AdminPages } from "@/constants/routes";
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import Link from "next/link";
import { useEffect, useState } from "react";

  

const Home = () => {
const [semester, setSemester] = useState("");
const [semesterList, setSemesterList] = useState([]);
const [sessionList, setSessionList] = useState([]);
const [loading, setLoading] = useState(false);
const [session, setSession] = useState("")
const [committeeList, setCommitteeList] = useState([]);
const [open, setOpen] = useState(false)
const [openConfirm, setOpenConfirm] = useState(false)
const [teacherlist, setTeacherList] = useState([]);

const [showAlert, setShowAlert] = useState(null);
const [showError, setShowError] = useState(null);

function handleClose()
{
    getSessionList();
    setOpen(false);
}

const handleCreateCommittee = async() => {
  await fetch('/api/admin/teacherList')
  .then(res => res.json())
  .then(data => setTeacherList(data));

  setOpen(true);
}

const handleSessionChange = (e) => {
    setSession(e.target.value);
}

function handleSemesterChange(e)
{
    setSemester(e.target.value)
}

const handleDeleteCommittee = () => {
  setOpenConfirm(true);
}

const handleConfirmClose = () => {
  setOpenConfirm(false);
}

const getSessionList = async() => {
    setLoading(true);
    fetch('/api/admin/sessionList')  
    .then(res => res.json())
    .then(data => setSessionList(data))
    setLoading(false);
}

const handleConfirmSubmit = async() => {
  await fetch('/api/admin/removeCommittee',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({session, semester})
  }).then(
    res => {
      if(res.ok){
      setSession('')
      setSemester('')
      getSessionList()
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false)
      },4000)
    }
    else{
      setShowError(true);

      setTimeout(() => {
        setShowError(false)
      },4000)
    }
})
}

const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 300
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
        minWidth: 250
      },
      {
        field: "department",
        headerName: "Deptartment",
        minWidth: 200,
        flex:1
      },

    {
      field: "role",
      headerName: "Role",
      minWidth: 200
    },
  ]


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
        setSemester('');
    }
},[session])

if(loading) <div>loading</div>

return(
    <Box>
      <Box sx={{display:'flex', justifyContent:'center', mt:1}}>
      <Box width={300} sx={{zIndex:99, position:'absolute'}}>
                {
                    showAlert && <Alert severity='success'>Deleted Successfully</Alert>
                }
                {
                    showError && <Alert severity='error'>ERROR!! Cannot be deleted</Alert>
                }
      </Box>
      </Box>
        <Box sx={{ mt:"30px", display:'flex', alignItems:'end'}}>
            <Box sx={{width:'150px', ml:2, mr:2}}>
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
        <Box sx={{width:'150px', ml:2, mr:2}}>
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
        <Box sx={{ml:'auto', mr:2}}>
        <Button variant="outlined" onClick={handleCreateCommittee} sx={{ml:2}}>Create Committee</Button>
        {session && semester && <Button variant="contained"  onClick={handleDeleteCommittee} sx={{ml:2, bgcolor:'red'}}>Delete Committee</Button>}
        <Link href='/admin/teachers'></Link>
        </Box>
        
      </Box>
      <Box sx={{m:2}}>
      <DataGrid 
      sx={{boxShadow:1}}
      columns={columns}
      rows={committeeList}
      hideFooter
      autoHeight
      />
      </Box>
    
    {openConfirm && <ConfirmDialog open={openConfirm} onClose={handleConfirmClose} onConfirm ={handleConfirmSubmit}/>}
    {open && <CommitteeDialog open={open} onClose={handleClose} list={teacherlist}/>}
      </Box>
    )
}

Home.getLayout = function getLayout(page){
    return(
        <Layout pages={AdminPages}>
          <main>{page}</main>
      </Layout>
    )
}
export default Home;