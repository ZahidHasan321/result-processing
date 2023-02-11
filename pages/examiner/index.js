import Layout from "@/component/layout/layout";
import { examinerPages } from "@/constants/routes";
import { useSession } from "next-auth/react";
import Router from "next/router";


const Home = () => {
  const {status, data } = useSession();
  if(status === 'unauthenticated'){
    Router.replace('auth/signin');
  }
  if(status ===  'authenticated'){
    return(
    <>
      <h1>Examiner page</h1>
    </>
    )
  }
  return(
  <h1>loading</h1>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout pages={examinerPages}>
        <main>{page}</main>
      </Layout>
  )
}

  
export default Home;