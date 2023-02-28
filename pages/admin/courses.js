import AntDesignGrid from "@/component/customDatagrid/customDatagrid";
import CourseDialog from "@/component/dialog/CourseDialog";
import Layout from "@/component/layout/layout";
import SemesterSelector from "@/component/selector/semesterSelector";
import { AdminPages } from "@/constants/routes";
import DeleteForever from "@mui/icons-material/DeleteForever";

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

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
          <Button variant="contained" sx={{ bgcolor: '#b71c1c', ":hover": { bgcolor: '#b71c1c' } }} onClick={(event) => { event.preventDefault(); handleDeleteRow(event, params) }}>
            <DeleteForever />
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
      })
    setChecked(true);
  }

  useEffect(() => {
    if (semester != '') {
      getCourseList();

    }
    else {
      setCourseList([])
      setChecked(false)
    }
  }, [semester])

  useEffect(() => {
    getSemesterList();
  }, [])


  return (
    <Paper variant="outlined" sx={{ m: 6, boxShadow: 3, minHeight: 400 }}>
      <Typography fontSize={30} sx={{ ml: 4, mt: 2 }}>Courses</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', m: 2, mr: 4, ml: 4, mb: 3 }}>
        <Typography variant="caption" sx={{ mb: 1 }}>Choose a session and a semester</Typography>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <SemesterSelector sx={{ width: '180px' }} list={semesterList} value={semester} onChange={(value) => setSemester(value)} label='semester' />

          <Button variant="contained" onClick={() => setOpen(true)} sx={{ ml: 'auto', alignSelf: 'flex-end', bgcolor: '#67be23', ":hover": { bgcolor: '#67be23' } }}>Add Course</Button>
        </Box>

        <AntDesignGrid
          sx={{ boxShadow: 3}}
          columns={columns}
          checked={checked}
          rows={courseList}
          getRowId={row => row.course_code}
          autoHeight
          hideFooter
        />
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