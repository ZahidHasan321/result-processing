import Layout from "@/component/layout/layout";
import StudentImporter from "@/component/student/studentImport";
import StudentList from "@/component/student/studentList";
import { AdminPages } from "@/constants/routes";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grow from "@mui/material/Grow";
import { useState } from "react";
import Container from "@mui/material/Container";
import { useSession } from "next-auth/react";
import { signOut } from 'next-auth/react';

const Student = () => {
  const userSession = useSession()


  const [show, setShow] = useState(false);

  if (userSession.status === "loading") {
    return <p>Loading...</p>
  }

  else if (userSession.status === 'unauthenticated' || userSession.data.user.role !== 'Chairman') {
    return (
      <>
        <h1>Access Denied</h1>
        <Button onClick={() => signOut({ callbackUrl: '/auth/signin' })}>Signout</Button>
      </>
    )
  }
  else {
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
}


Student.getLayout = function getLayout(page) {
  return (
    <Layout pages={AdminPages}>
      <main>{page}</main>
    </Layout>
  )
}
export default Student;