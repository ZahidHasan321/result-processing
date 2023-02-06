import { Box, Toolbar } from "@mui/material";
import ResponsiveDrawer from "../drawer/responsivedrawer";

const PortalLayout = ({children, ...restProps}) => {
    return(
        <>
        <Box sx={{display:"flex"}}>
        <ResponsiveDrawer {...restProps}/>
        <Box sx={{display:"flex", flexDirection:"column"}}>
        <Toolbar/>
        <main>{children}</main>
        </Box>
        </Box>
        </>
    )
}

export default PortalLayout;