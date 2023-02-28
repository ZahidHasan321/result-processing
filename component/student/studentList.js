import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import AntDesignGrid from "../customDatagrid/customDatagrid";
import AutoCompleteSession from "../selector/autocompleteSession";
import SemesterSelector from "../selector/semesterSelector";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import UploadStudentDialog from "../dialog/uploadStudentDialog";


const columns = [
  {
    field: "roll",
    headerName: "ID",
    minWidth: 200,
    flex: 1
  },
  {
    field: "name",
    headerName: "Name",
    minWidth: 200,
    flex: 1
  },
  {
    field: "hall",
    headerName: "Hall",
    minWidth: 200,
    flex: 1
  },
];

const StudentList = () => {
  const [studentList, setStudentList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [sessionList, setSessionList] = useState([]);
  const [semesterList, setSemesterList] = useState([]);
  const [session, setSession] = useState('');
  const [semester, setSemester] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState(null);

  const getSessionList = () => {
    fetch('/api/admin/student/getStudentSession')
      .then(res => res.json())
      .then(data => setSessionList(data))
  }

  const getSemesterList = () => {
    if (session == '') return;
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
    if (session == '' || semester == '') {
      setStudentList([]);
      return;
    }

    fetch('/api/admin/student/getStudentData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ session, semester })
    })
      .then(res => res.json())
      .then(data => setStudentList(data))
  }, [semester])


  useEffect(() => {
    if (session != '')
      getSemesterList();
    else {
      setSemester('');
    }
  }, [session])

  useEffect(() => {
    getSessionList();
  }, [])

  setTimeout(() => {
    setChecked(true);
  }, 200)

  const handleUpdateSemester = () => {
    if (studentList.length > 0)
      setOpenDialog(true);
    else {
      setSnackbar({ children: 'No data found', severity: 'error' })
    }
  }

  return (
    <Box sx={{ m: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Box sx={{ display: "flex", mb: 3 }}>
        <AutoCompleteSession sx={{ width: '180px' }} list={sessionList} onChange={(value) => setSession(value)} label='Exam Session' />
        <SemesterSelector sx={{ width: '180px', ml: 3  }} value={semester} list={semesterList} onChange={value => setSemester(value)} label='semester' />
        <Box sx={{ ml: 'auto', pt:3 }}>
          <Button size="small" variant="contained"  onClick={handleUpdateSemester}> Update semester</Button>
        </Box>
      </Box>
      <AntDesignGrid
        sx={{ boxShadow: 3 }}
        autoHeight
        checked={checked}
        rows={studentList}
        columns={columns}
        getRowId={(row) => row.roll}
      />

      {studentList.length > 0 && openDialog && <UploadStudentDialog list={studentList} open={openDialog} onClose={(value) => { setOpenDialog(false); setSnackbar(value); value && getSessionList() }} />}
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
    </Box>
  )
}
export default StudentList;