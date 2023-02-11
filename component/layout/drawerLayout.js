import { Box, Toolbar } from "@mui/material";
import ResponsiveDrawer from "../drawer/responsivedrawer";

const DrawerLayout = ({children, ...restProps}) => {
    return(
        <>
        <Box sx={{display:'flex'}}>
            <ResponsiveDrawer {...restProps}/>
            <Box sx={{flexGrow: 1, p: 2}}>
                <Toolbar/>
                <main>{children}</main>
            </Box>
        </Box>
        </>
    )
}

export default DrawerLayout;