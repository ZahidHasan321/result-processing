import Layout from "@/component/layout/layout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Router from "next/router";


const Home = () => {
  const { status, data } = useSession();
  if (status === 'unauthenticated') {
    Router.replace('auth/signin');
  }

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
  if (status === 'authenticated') {
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

  return (
    <h1>loading</h1>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout>
      <main>{page}</main>
    </Layout>
  )
}

export default Home;
