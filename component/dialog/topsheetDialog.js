
import { Box, Button, Chip, Dialog, DialogTitle, Divider, Grow, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import ChipArray from "../chipComponent/chipArray";


const TopsheetDialog = (props) => {
    const { open, onClose, semester, session, course } = props;
    const [presentData, setPresentData] = useState([{ roll: '19701030' }]);
    const [absentData, setAbsentData] = useState([]);
    const [expelledData, setExpelledData] = useState([]);

    const updatePresentData = (array) => {
        setPresentData([...array]);
    }

    const updateAbsentData = (array) => {
        setAbsentData([...array]);
    }

    const updateExpelledData = (array) => {
        setExpelledData([...array]);
    }


    const handleOnClose = () => {
        onClose();
    }


    return (
        <Dialog TransitionComponent={Grow} maxWidth='xl' fullWidth open={open} onClose={handleOnClose} sx={{ backdropFilter: 'blur(5px)' }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <DialogTitle fontSize={25} fontWeight='bold'>Top Sheet</DialogTitle>
                
                <Box sx={{border:1, m:2}}>
                <Typography textTransform={'uppercase'} fontWeight='bold' sx={{textAlign:'center'}} fontSize={16}>ID's of Present Students</Typography>
                <ChipArray list={presentData} updateData={updatePresentData} sx={{
                    minWidth: '700px',
                    maxWidth: '700px',
                    minHeight: '300px'
                }} />
                </Box>
                
                <Box sx={{border:1, m:2}}>
                <Typography textTransform={'uppercase'} fontWeight='bold' sx={{textAlign:'center'}} fontSize={16}>ID's of Absent Students</Typography>
                <ChipArray list={absentData} updateData={updateAbsentData} sx={{
                    minWidth: '700px',
                    maxWidth: '700px',
                    minHeight: '200px'
                }} />
                </Box>
                
                <Box sx={{border:1, m:2}}>
                <Typography textTransform={'uppercase'} fontWeight='bold' sx={{textAlign:'center'}} fontSize={16}>ID's of Expelled Students</Typography>
                <ChipArray list={expelledData} updateData={updateExpelledData} sx={{
                    minWidth: '700px',
                    maxWidth: '700px',
                    minHeight: '200px'
                }} />
                </Box>
            </Box>

        </Dialog>
    )
}

export default TopsheetDialog;