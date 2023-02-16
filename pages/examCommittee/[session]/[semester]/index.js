import Layout from "@/component/layout/layout";
import { semesterPages } from "@/constants/routes";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const columns = [
  {
    field: "course_code",
    headerName: "Course Code",
    minWidth: 200,
    flex: 1
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


  const getCourseData = () => {
    
  }
  
    return(
      <Box>
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