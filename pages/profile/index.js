import Layout from "@/component/layout/layout";
import CircularProgress  from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DataArray } from "@mui/icons-material";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const { status, data } = useSession();
  
  if (status === 'unauthenticated') {
    Router.replace('auth/signin');
  }

  if(status === 'loading') return <CircularProgress />

  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography>Name: {data.user.name}</Typography>
      <Typography>Email: {data.user.email}</Typography>
      <Typography>Phone: {data.user.phone}</Typography>
      <Typography>Department: {data.user.department}</Typography>
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