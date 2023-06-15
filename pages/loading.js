import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress"
import { useSession } from "next-auth/react";

const Loading = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt:50}}>
            <CircularProgress />
        </Box>
    )
}

Loading.getLayout = function getLayout({ children }) {

    const { data, status } = useSession()
  
    if (status === 'loading') {
        return <Loading />
    }
  
    if (status === 'unauthenticated') {
      Router.replace('/auth/signin')
    }
  
    if (status === 'authenticated' && data.user.role !== 'Teacher') {
      Router.replace('/accessDenied')
    }
  
    return (
      <>
        <main>{children}</main>
      </>
    )
  }

export default Loading;