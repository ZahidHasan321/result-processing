import { signOut, useSession } from "next-auth/react";
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


  
export default Home;