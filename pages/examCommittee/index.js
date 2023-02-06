import CommitteeLayout from "@/component/layout/committeeLayout";
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
      <CommitteeLayout>
        <main>{page}</main>
      </CommitteeLayout>
    )
  }

  
export default Home;