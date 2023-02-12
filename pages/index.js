import Layout from "@/component/layout/layout";
import { Button, Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Router from "next/router";

const Home = () => {
  const {status, data } = useSession();
  if(status === 'unauthenticated'){
    Router.replace('auth/signin');
  }

  const boxButton = {
    size: "large",
    height:"100px",
    width:"200px",
    justifyContent:"center"
  }

  const linkStyle = {
    textDecoration:"none", 
    color:"black"
  }
  if(status ===  'authenticated'){
    return(
    <>
      <Container maxWidth="xl">
      <Box sx={{display:"flex", flexDirection:'column', alignItems:'center', mt:'10%'}}>
      <Typography fontSize={50} mb={10}>Choose which one you want to work on?</Typography>
        <Stack direction='row' spacing={40}>
        <Link style={linkStyle} href="/examiner"><Button sx = {boxButton} variant = "contained"> Examiner Portal</Button></Link>
        <Link style = {linkStyle} href="/examCommittee"><Button sx = {boxButton} variant = "contained">Exam Committee portal</Button></Link>
        </Stack>
        </Box>
      </Container>
      
    </>
    )
  }

  return(
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
