import Layout from "@/component/layout/layout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Router from "next/router";
import Loading from "./loading";


const Home = () => {
  const boxButton = {
    size: "large",
    height: "100px",
    width: "200px",
    justifyContent: "center"
  }

  const linkStyle = {
    textDecoration: "none",
    color: "black"
  }

  
  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', mt: '10%' }}>
          <Typography fontSize={50} mb={10}>Choose which one you want to work on?</Typography>
          <Stack direction='row' spacing={10}>
            <Link style={linkStyle} href="/examCommittee"><Button sx={boxButton} variant="contained">Exam Committee</Button></Link>
            <Link style={linkStyle} href="/examiner"><Button sx={boxButton} variant="contained"> Examiner</Button></Link>
            <Link style={linkStyle} href="/courseTeacher"><Button sx={boxButton} variant="contained"> Course Teacher</Button></Link>
          </Stack>
        </Box>
      </Container>
    </>
  )
}

Home.getLayout = function getLayout({ children }) {

  const {data, status} = useSession()

  if (status === 'loading') {
    return <Loading />
  }

  if (status === 'unauthenticated') {
    Router.replace('/auth/signin')
  }

  if(status === 'authenticated' && data.user.role !== 'Teacher'){
    Router.replace('/accessDenied')
  }

  return (
    <Layout>
      <main>{children}</main>
    </Layout>
  )
}

export default Home;
