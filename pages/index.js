import Layout from "@/component/layout/layout";
import { Button, Container, Stack } from "@mui/material";
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
    height:"200px",
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
      <Container maxWidth="xl" sx={{display:"flex", alignContent:"center", justifyContent:"center"}} >
        <Stack marginTop={"20%"} spacing={50} direction = "row">
        <Link style={linkStyle} href="/examiner"><Button sx = {boxButton} variant = "contained"> Examiner Portal</Button></Link>
        <Link style = {linkStyle} href="/examCommittee"><Button sx = {boxButton} variant = "contained">Exam Committee portal</Button></Link>
        </Stack>
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
