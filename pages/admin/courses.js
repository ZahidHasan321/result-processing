import CourseDialog from "@/component/dialog/CourseDialog";
import Layout from "@/component/layout/layout";
import { AdminPages } from "@/constants/routes";
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";


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
    flex:1
  },
  {
      field: "course_credit",
      headerName: "Course Credit",
      minWidth: 250
    },
    {
      field: "type",
      headerName: "Course Type",
      minWidth: 200,
      flex:1
    }
]

const Courses = () => {
  const [semesterList, setSemesterList ] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(null);
  const [semester, setSemester ] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    getSemesterList()
    if(semester != '')
      getCourseList()
    setOpen(false);
  }

  const handleAddCourse = () => {
    setOpen(true);
  }

  const getSemesterList = async() => {
    setLoading(true)
    await fetch('/api/admin/courses/semesterList')
    .then(res => res.json())
    .then(data => setSemesterList(data))
    setLoading(false)
  }

  const getCourseList = async() => {
    await fetch('/api/admin/courses/courseList',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(semester)
    })
    .then(res => res.json())
    .then(data => setCourseList(data))
  }

  function handleSemesterChange(e)
{
    setSemester(e.target.value)
}
  useEffect(() =>{
    if(semester != '')
    getCourseList();
  },[semester])

  useEffect(()=> {
      getSemesterList();
  },[])

  
if(loading) return <div>loading</div>

return(
  <Box sx={{display:'flex', flexDirection:'column', m:3}}>
    <Box sx={{display:'flex', mb:2}}>
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
                    semesterList.map((item, idx) => {
                        return(
                        <MenuItem key={idx} value={item.semester}> {item.semester} </MenuItem>
                        )
                        })
                }
        </Select>}
        </FormControl>
        </Box>

        <Button variant="outlined" onClick={handleAddCourse} sx={{ml:'auto'}}>Add Course</Button>
    </Box>
    <DataGrid 
    columns={columns}
    rows={courseList}
    getRowId={(row) => row.course_code}
    autoHeight
    hideFooter
    />
    <CourseDialog open={open} onClose={handleClose} />
  </Box>
)
}

Courses.getLayout = function getLayout(page){
    return(
        <Layout pages={AdminPages}>
          <main>{page}</main>
      </Layout>
    )
}

export default Courses;