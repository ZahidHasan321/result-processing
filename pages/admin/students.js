import Layout from "@/component/layout/layout";
import StudentImporter from "@/component/student/studentImport";
import StudentList from "@/component/student/studentList";
import { AdminPages } from "@/constants/routes";
import { Box, Paper } from "@mui/material";


const Student = () => {
  return (
    <Box>
      <Paper sx={{ m: 6, boxShadow: 3 }}>
        <Box sx={{ m: 4, pt: 3, pb: 3, display: 'flex', justifyContent:'center'}}>
          <StudentList />
          <StudentImporter />
        </Box>
      </Paper>
    </Box>
  )
}



Student.getLayout = function getLayout(page) {
  return (
    <Layout pages={AdminPages}>
      <main>{page}</main>
    </Layout>
  )
}
export default Student;