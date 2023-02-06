import Layout from "@/component/layout/layout";
import { Button, Container, Stack } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
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
  if(status ===  'authenticated'){
    return(
    <>
      <Container maxWidth="xl" sx={{display:"flex", alignContent:"center", justifyContent:"center"}} >
        <Stack marginTop={"20%"} spacing={50} direction = "row">
        <Button sx = {boxButton} variant = "contained" href="\examiner">Examiner Portal</Button>
        <Button sx = {boxButton} variant = "contained" href="\examCommittee">Exam Committee portal </Button>
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
