import Box  from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress"

const Loading = () => {
    return (
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <CircularProgress />
        </Box>
    )
}

export default Loading;