import Layout from "@/component/layout/layout";
import CircularProgress  from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const { status, data } = useSession();
  
  if (status === 'unauthenticated') {
    Router.replace('auth/signin');
  }

  if(status === 'loading') return <CircularProgress />

  if(status === 'authenticated') getProfileData()

  const getProfileData = async () => {
    const { user } = await getSession();

    setUserData(user);
  }

  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography>Name: {userData.name}</Typography>
      <Typography>Email: {userData.email}</Typography>
      <Typography>Phone: {userData.phone}</Typography>
      <Typography>Department: {userData.department}</Typography>
    </Box>
  )
}

Profile.getLayout = function getLayout(page) {
  return (
    <Layout>
      <main>{page}</main>
    </Layout>
  )
}
export default Profile;