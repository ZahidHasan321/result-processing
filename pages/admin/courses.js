import CourseDialog from "@/component/dialog/CourseDialog";
import Layout from "@/component/layout/layout";
import { AdminPages } from "@/constants/routes";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { Box, Button, FormControl, Grow, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useEffect, useState } from "react";


const Courses = () => {
  const [semesterList, setSemesterList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(null);
  const [semester, setSemester] = useState('');
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);



  const columns = [
    {
      field: "course_code",
      headerName: "Course Code",
      minWidth: 300
    },
    {
      field: "course_name",
      headerName: "Course Name",
      minWidth: 200,
      flex: 1
    },
    {
      field: "course_credit",
      headerName: "Course Credit",
      minWidth: 250
    },
    {
      field: "course_type",
      headerName: "Course Type",
      minWidth: 200,
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

  const handleClose = () => {
    getSemesterList()
    if (semester != '')
      getCourseList()
    setOpen(false);
  }

  const handleDeleteRow = async (e, params) => {
    await fetch('/api/admin/courses/deleteCourse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params.id)
    })
    getCourseList();
    getSemesterList();
  }

  const getSemesterList = async () => {
    setLoading(true)
    await fetch('/api/admin/courses/semesterList')
      .then(res => res.json())
      .then(data => {
        setSemesterList(data)
      })
    setLoading(false)
  }

  const getCourseList = async () => {
    await fetch('/api/admin/courses/courseList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(semester)
    })
      .then(res => res.json())
      .then(data => {
        setCourseList(data)
        setChecked(true)
      })
  }

  function handleSemesterChange(e) {
    setSemester(e.target.value)
  }
  useEffect(() => {
    if (semester != '')
      getCourseList();
    else {
      setCourseList([])
      setChecked(false)
    }
  }, [semester])

  useEffect(() => {
    getSemesterList();
  }, [])


  return (
    <Paper variant="outlined" sx={{ m: 3, boxShadow: 3 }}>
      <Typography fontSize={30} sx={{ ml: 4, mt: 2 }}>Courses</Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', m: 2, mr: 4, ml: 4, mb:3}}>
      <Typography variant="caption" sx={{ mb:1 }}>Choose a session and a semester</Typography>
        <Box sx={{ display: 'flex', mb: 2 }}>
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
                  semesterList.map((item, idx) => {
                    return (
                      <MenuItem key={idx} value={item.semester}> {item.semester} </MenuItem>
                    )
                  })
                }
              </Select>}
            </FormControl>
          </Box>

          <Button variant="outlined" onClick={() => setOpen(true)} sx={{ ml: 'auto', alignSelf: 'flex-end', boxShadow: 1, border: `1px solid ${grey[300]}`,borderRadius: '0.75em'}}>Add Course</Button>
        </Box>
        <Grow in={checked}
        >
          <DataGrid
            sx={{ boxShadow: 1 }}
            columns={columns}
            rows={courseList}
            getRowId={ row => row.course_code }
            autoHeight
            hideFooter
          />
        </Grow>
        <CourseDialog open={open} onClose={handleClose} />
      </Box>
    </Paper>
  )
}

Courses.getLayout = function getLayout(page) {
  return (
    <Layout pages={AdminPages}>
      <main>{page}</main>
    </Layout>
  )
}

export default Courses;