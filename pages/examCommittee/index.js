import PortalLayout from "@/component/layout/portalLayout";
import { committeePages } from "@/constants/routes";
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
      <h1>Exam Committee page</h1>
    </>
    )
  }

  return(
  <h1>loading</h1>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <PortalLayout pages={committeePages}>
      <main>{page}</main>
    </PortalLayout>
  )
}
  
export default Home;