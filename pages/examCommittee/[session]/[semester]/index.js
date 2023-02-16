import Layout from "@/component/layout/layout";
import { semesterPages } from "@/constants/routes";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const columns = [
  {
    field: "course_code",
    headerName: "Course Code",
    minWidth: 200
  },
  {
    field: "course_name",
    headerName: "Course Name",
    minWidth: 200,
    flex: 1
  },
  {
    field: "submitted",
    headerName: "Submitted",
    minWidth: 200,
    flex: 1
  },
  {
    field: "assigned",
    headerName: "Examiner Assigned",
    minWidth: 200,
    flex: 1
  }
]

const Dashboard = () => {
  const [courseData, setCourseData] = useState([])
  const getCourseData = async() => {
    
  }

  useEffect(() => {
    getCourseData();
  })
  
    return(
      <Box sx={{m:3}}>
        <DataGrid 
        columns={columns}
        rows={courseData}
        density='compact'
        hideFooter
        autoHeight/>
        
      </Box>
    )
}

Dashboard.getLayout = function getLayout(page){
    const router = useRouter();
    const query = router.query;

    return (
      <Layout pages={semesterPages} query={query}>
        <main>{page}</main>
      </Layout>
    )
  }

export default Dashboard;