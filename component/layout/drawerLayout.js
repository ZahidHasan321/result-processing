import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import ResponsiveDrawer from "../drawer/persistantDrawer";

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