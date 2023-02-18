import CommitteeDialog from "@/component/dialog/committeeDialog";
import ConfirmDialog from "@/component/dialog/ConfirmDialog";
import Layout from "@/component/layout/layout";
import AutoCompleteSession from "@/component/selector/autocompleteSession";
import { AdminPages } from "@/constants/routes";
import { formatOrdinals } from "@/helper/ordinal";
import { Alert, Box, Button, Collapse, Fade, FormControl, InputLabel, MenuItem, Paper, Select, Slide, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
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

  const [checked, setChecked] = useState(false);
  const [showAlert, setShowAlert] = useState(null);
  const [showError, setShowError] = useState(null);

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
        if (res.ok) {
          setSession('')
          setSemester('')
          getSessionList()
          setShowAlert(true);

          setTimeout(() => {
            setShowAlert(false)
          }, 4000)
        }
        else {
          setShowError(true);

          setTimeout(() => {
            setShowError(false)
          }, 4000)
        }
      })
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
      minWidth: 200,
      flex: 1
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 200
    },
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
    if(session == '')
    {
      setSemesterList([])
      setSemester('')
    }
    else{
    getSemesterList();
    setSemester('')
  }
  }, [session])

  if (loading) <div>loading</div>

  return (
    <Paper variant="outlined" sx={{ m: 3, boxShadow: 3 }}>
      <Box sx={{ ml: 2, mr: 2 }}>
        <Typography fontSize={30} sx={{ ml: 2, mt: 2 }}>Exam committee</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <Box width={300} sx={{ zIndex: 99, position: 'absolute', }}>
            {
              showAlert && <Alert severity='success'>Deleted Successfully</Alert>
            }
            {
              showError && <Alert severity='error'>ERROR!! Cannot be deleted</Alert>
            }
          </Box>
        </Box>
        <Typography variant="caption" sx={{ ml: 2 }}>Choose a session and a semester</Typography>
        <Box sx={{ mt: 1, ml: 2, mr: 2, mb: 3, display: 'flex', alignItems: 'end' }}>
          <AutoCompleteSession sx={{ width: '180px', mr: 3 }} list={sessionList} onChange={(value) => { setSession(value) }} label='Session' />
          <Box sx={{ width: '180px' }}>
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
                    return (
                      <MenuItem key={idx} value={sem.semester}> {formatOrdinals(sem.semester)} </MenuItem>
                    )
                  })
                }
              </Select>}
            </FormControl>
          </Box>
          <Box sx={{ ml: 'auto', }}>

            <Slide in={checked} direction='left' mountOnEnter unmountOnExit easing={{
              enter: "cubic-bezier(0, 1.2, .8, 1)",
              exit: "liner"
            }}>
              <Button variant="contained" size="small" onClick={handleDeleteCommittee} sx={{ ml: 2, bgcolor: 'red', boxShadow: 1}}>Delete Committee</Button>
            </Slide>
            <Button variant="contained" size="small" onClick={handleCreateCommittee} sx={{ ml: 2, boxShadow: 1, color: 'white', bgcolor: '#67be23', ":hover":{ bgcolor:'red'} }}>Create Committee</Button>
          </Box>

        </Box>
        <Slide in={checked} direction='left'  easing={{
              enter: "cubic-bezier(0, 1.2, .8, 1)",
              exit: "liner"
            }}
        >
          <Box sx={{ m: 2, mb: 4 }}>
            <DataGrid
              sx={{ boxShadow: 3 }}
              columns={columns}
              rows={committeeList}
              hideFooter
              autoHeight
            />
          </Box>
        </Slide>

        <ConfirmDialog open={openConfirm} onClose={() => { setOpenConfirm(false) }} onConfirm={handleConfirmSubmit} />
        <CommitteeDialog open={open} onClose={handleClose} list={teacherlist} />

      </Box>
    </Paper>
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