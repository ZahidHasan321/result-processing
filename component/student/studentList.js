import  Box  from "@mui/material/Box";
import { useEffect, useState } from "react";
import AntDesignGrid from "../customDatagrid/customDatagrid";
import AutoCompleteSession from "../selector/autocompleteSession";
import SemesterSelector from "../selector/semesterSelector";


const columns = [
  {
    field: "roll",
    headerName: "ID",
    minWidth: 200,
    flex:1
  },
  {
    field: "name",
    headerName: "Name",
    minWidth: 200,
    flex:1
  },
  {
    field: "hall",
    headerName: "Hall",
    minWidth: 200,
    flex:1
  },
];

const StudentList = () => {
  const [studentList, setStudentList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [sessionList, setSessionList] = useState([]);
  const [semesterList, setSemesterList] = useState([]);
  const [session, setSession] = useState('');
  const [semester, setSemester] = useState('');

  const getSessionList = () => {
    fetch('/api/admin/student/getStudentSession')
      .then(res => res.json())
      .then(data => setSessionList(data))
  }

  const getSemesterList = () => {
    if(session == '') return;
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
    if(session == '' || semester == ''){
      setStudentList([]);
      return;
    }

    fetch('/api/admin/student/getStudentData', {
      method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({session, semester})
    })
      .then(res => res.json())
      .then(data => setStudentList(data))
  }, [semester])


  useEffect(() => {
    if(session != '')
     getSemesterList();
    else{
      setSemester('');
    }
  },[session])

  useEffect(()=> {
    getSessionList();
  }, [])

  setTimeout(()=> {
    setChecked(true);
  }, 200)
  return (
    <Box sx={{m:3,display:'flex', flexDirection:'column', flexGrow:1}}>
      <Box sx={{display:"flex", mb:3}}>
      <AutoCompleteSession sx={{ width: '180px' }} list={sessionList} onChange={(value) => setSession(value)} label='Exam Session' />
      <SemesterSelector sx={{ width: '180px', ml:3 }} value={semester} list={semesterList} onChange={value => setSemester(value)} label='semester' />
      </Box>
      <AntDesignGrid
        sx={{ boxShadow: 3 }}
        autoHeight
        checked={checked}
        rows={studentList}
        columns={columns}
        getRowId ={(row) => row.roll}
      />
    </Box>
  )
}
export default StudentList;