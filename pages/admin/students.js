import Layout from "@/component/layout/layout";
import StudentImporter from "@/component/student/studentImport";
import StudentList from "@/component/student/studentList";
import { AdminPages } from "@/constants/routes";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grow from "@mui/material/Grow";
import { useState } from "react";
import  Container from "@mui/material/Container";


const Student = () => {
  const [show, setShow] = useState(false);
  return (
    <Box>
      <Paper sx={{ m: 6, boxShadow: 3, display: 'flex', flexDirection: 'column' }}>
        <Button size='medium' sx={{ ml: 'auto', mr: 3, mt: 3 }} onClick={() => setShow(!show)} variant={'contained'}> {show ? 'Close Import' : 'Import Student'}</Button>
        <Box sx={{ m: 4, pb: 3, display: 'flex', justifyContent: 'center' }}>
          <StudentList />
          {show &&
            <Grow in={show}>
              <Container  >
                <StudentImporter />
              </Container>
            </Grow>}
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