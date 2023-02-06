import { Box, Toolbar } from "@mui/material";
import MenuAppBar from "../appbar/appbar";
import ResponsiveDrawer from "../drawer/responsivedrawer";

const CommitteeLayout = ({children}) => {
    return(
        <>
        <Box sx={{display:"flex"}}>
        <ResponsiveDrawer/>
        <Box sx={{display:"flex", flexDirection:"column"}}>
        <Toolbar/>
        <main>{children}</main>
        </Box>
        </Box>
        </>
    )
}

export default CommitteeLayout;