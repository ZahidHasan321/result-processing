import Layout from "@/component/layout/layout";
import StudentImporter from "@/component/student/studentImport";
import StudentList from "@/component/student/studentList";
import { AdminPages } from "@/constants/routes";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { useState } from "react";

const Student = () => {

  const [show, setShow] = useState(false);


  return (
    <Box>
      <Paper sx={{ boxShadow: 3, display: 'flex', flexDirection: 'column' }}>
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



Student.getLayout = function getLayout({children}) {

  const {status, data } = useSession()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === 'unauthenticated') {
    Router.replace('/auth/signin');
  }

  if (status === 'authenticated' && data.user.role !== 'Chairman') {
    Router.replace('/accessDenied');
  }

  return (
    <Layout pages={AdminPages} idx={3}>
      <main>{children}</main>
    </Layout>
  )
}
export default Student;