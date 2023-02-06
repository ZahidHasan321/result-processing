import PortalLayout from "@/component/layout/portalLayout";
import { useSession } from "next-auth/react";
import Router from "next/router";
import { examinerPages } from "@/constants/routes";


const Home = () => {
  const {status, data } = useSession();
  if(status === 'unauthenticated'){
    Router.replace('auth/signin');
  }
  if(status ===  'authenticated'){
    return(
    <>
      <h1>Examiner page</h1>
      <h1>Examiner page</h1>
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
    <PortalLayout pages={examinerPages}>
      <main>{page}</main>
    </PortalLayout>
  )
}

  
export default Home;