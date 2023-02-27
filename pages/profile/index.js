import Layout from "@/component/layout/layout";
import { Box, Typography } from "@mui/material";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react"

const Profile = () => {
    const [userData, setUserData ] = useState({});
    const getProfileData = async() => {
        const { user } = await getSession();

        setUserData(user);
    }

    useEffect(() => {
        getProfileData();
    })
    return (
        <Box sx={{display:'flex', flexDirection:'column'}}>
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