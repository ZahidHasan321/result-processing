import AntDesignGrid from "@/component/customDatagrid/customDatagrid";
import CommitteeDialog from "@/component/dialog/committeeDialog";
import ConfirmDialog from "@/component/dialog/ConfirmDialog";
import Layout from "@/component/layout/layout";
import AutoCompleteSession from "@/component/selector/autocompleteSession";
import SemesterSelector from "@/component/selector/semesterSelector";
import { AdminPages } from "@/constants/routes";
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Slide from "@mui/material/Slide"
import Snackbar from "@mui/material/Snackbar"
import Typography from "@mui/material/Typography"
import { useCallback, useEffect, useState } from "react";



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

  const [checked, setChecked] = useState(false);
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  function handleClose() {
    getSessionList();
    if (session != '')
      getSemesterList();
    setOpen(false);
  }

  const handleCreateCommittee = async () => {
    await fetch('/api/admin/teacherList')
      .then(res => res.json())
      .then(data => setTeacherList(data));

    setOpen(true);
  }

  function handleSemesterChange(e) {
    setSemester(e.target.value)
  }

  const handleDeleteCommittee = () => {
    setOpenConfirm(true);
  }

  const getSessionList = async () => {
    setLoading(true);
    fetch('/api/admin/sessionList')
      .then(res => res.json())
      .then(data => {
        setSessionList(data);
      })
    setLoading(false);
  }

  const handleConfirmSubmit = async () => {
    await fetch('/api/admin/removeCommittee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ session, semester })
    }).then(
      res => {
        setSnackbar({ children: 'Removed committee successfully', severity: 'success' })
        if (res.ok) {
          setSession(null)
          setSemester('')
          getSessionList()

        }
        else {
          setSnackbar({ children: 'Failed to remove committee', severity: 'error' })
        }
      })
  }

  const processRowUpdate = (newRow, oldRow) => {
    if (session != '' && semester != null) {
      fetch('/api/admin/updateCommitteeRole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: newRow.role, id: newRow.id, session, semester })
      })
        .then(res => res.json())
        .then(data => {
          if (data.command == "UPDATE") {
            setSnackbar({ children: 'Role Updated', severity: "success" })
          }
          else {
            setSnackbar({ children: 'Failed to update row', severity: "error" })
          }
        });

      return newRow;
    }
    else
      return oldRow;
  }

  const columns = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 300,
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
    },
    {
      field: "department",
      headerName: "Department",
      minWidth: 300,
      flex: 1
    },

    {
      field: "role",
      editable: true,
      type: "singleSelect",
      valueOptions: ["Chairman", "Tabulator", "Member"],
      minWidth: 150
    }
  ]


  useEffect(() => {
    getSessionList();
  }, [])

  useEffect(() => {
    if (semester != '' && session != '') {
      fetch('/api/admin/committeeList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ session, semester })
      })
        .then(res => res.json())
        .then(data => {
          setCommitteeList(data);
          setChecked(true)
        });
    }
    else if (semester == '') {
      setChecked(false);
      setCommitteeList([]);
    }
  }, [semester])

  const getSemesterList = async () => {
    if (session != '') {
      await fetch('/api/admin/semesterList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(session)
      })
        .then(res => res.json())
        .then(data => setSemesterList(data))
    }
  }

  useEffect(() => {
    if (session == '') {
      setSemesterList([])
      setSemester('')
    }
    else {
      getSemesterList();
      setSemester('')
    }
  }, [session])

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);

  if (loading) <div>loading</div>

  return (
    <Box>
      <Paper variant="outlined" sx={{  boxShadow: 3 }}>
        <Box sx={{ ml: 2, mr: 2 }}>
          <Typography fontSize={30} sx={{ ml: 2, mt: 2 }}>Exam committee</Typography>

          <Typography variant="caption" sx={{ ml: 2 }}>Choose a session and a semester</Typography>
          <Box sx={{ mt: 1, ml: 2, mr: 2, mb: 3, display: 'flex', alignItems: 'end' }}>
            <AutoCompleteSession sx={{ width: '180px', mr: 3 }} list={sessionList} onChange={(value) => { setSession(value) }} label='Session' />
            <SemesterSelector sx={{ width: '180px' }} list={semesterList} value={semester} onChange={(value) => setSemester(value)} label='semester' />

            <Box sx={{ ml: 'auto', }}>

              <Slide in={checked} direction='left' mountOnEnter unmountOnExit easing={{
                enter: "cubic-bezier(0, 1.2, .8, 1)",
                exit: "liner"
              }}>
                <Button variant="contained" size="small" onClick={handleDeleteCommittee} sx={{ ml: 2, bgcolor: 'red', boxShadow: 1, ":hover": { bgcolor: 'red' } }}>Delete Committee</Button>
              </Slide>
              <Button variant="contained" size="small" onClick={handleCreateCommittee} sx={{ ml: 2, boxShadow: 1, color: 'white', bgcolor: '#67be23', ":hover": { bgcolor: '#67be23' } }}>Create Committee</Button>
            </Box>

          </Box>
          <Slide in={checked} direction='left' easing={{
            enter: "cubic-bezier(0, 1.2, .8, 1)",
            exit: "liner"
          }}
          >
            <Box sx={{ m: 2, mb: 4 }}>
              <AntDesignGrid
                sx={{ boxShadow: 3 }}
                columns={columns}
                rows={committeeList}
                checked={checked}
                hideFooter
                autoHeight
                experimentalFeatures={{ newEditingApi: true }}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={handleProcessRowUpdateError}
              />
            </Box>
          </Slide>

          <ConfirmDialog open={openConfirm} onClose={() => { setOpenConfirm(false) }} onConfirm={handleConfirmSubmit} />
          <CommitteeDialog open={open} onClose={handleClose} list={teacherlist} />

        </Box>
        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </Paper>
    </Box>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout pages={AdminPages}>
      <main>{page}</main>
    </Layout>
  )
}
export default Home;