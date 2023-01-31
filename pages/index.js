import { getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";

const Home = () => {

  async function redirectUser()
  {
    const session = await getSession()
    if(session.user){
      if(session.user.role == 'examiner'){
        Router.replace('/examiner/')
      }
      else if(session.user.role == 'courseTeacher'){
        Router.replace('/courseTeacher/')
      }
      else if(session.user.role == 'examCommittee'){
        Router.replace('/examCommittee/')
      }
    }
    else{
      Router.replace('/auth/signin')
    }
  }
    
    useEffect(() => {
      redirectUser();
    })
    
  return(
  <>
    <h1>loading</h1>
  </>
  )
}

export default Home;