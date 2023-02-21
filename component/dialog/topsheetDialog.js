
import { Box, Button, Chip, Dialog, DialogTitle, Grow, TextField } from "@mui/material";
import { useState } from "react";


const TopsheetDialog = (props) => {
    const { open, onClose, semester, session, course } = props;
    const [presentData, setPresentData] = useState([{ roll: '19701030' }]);
    const [absentData, setAbsentData] = useState([]);
    const [inputPresent, setInputPresent] = useState('');

    const handleOnClose = () => {
        onClose();
    }

    const handlePresentSubmit = (event) => {
        event.preventDefault();

        var isPresent = presentData.some((item) => item.roll === inputPresent);

        if (isPresent)
            console.log('Already exists');
        else if(inputPresent.length > 9) 
            console.log('Too Big')
        else if (!isPresent && inputPresent != '')
            setPresentData(presentData => [...presentData, { roll: inputPresent }]);

    }

    const handlePresentDelete = (item) => {

        console.log('runs');
        setPresentData((presents) => presents.filter((present) => present.roll !== item.roll));
    }

    return (
        <Dialog TransitionComponent={Grow} fullWidth open={open} onClose={handleOnClose} sx={{ backdropFilter: 'blur(5px)' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <DialogTitle>Top Sheet</DialogTitle>
            <Box sx={{
                display: 'flex',
                justifyContent:'flex-start',
                alignItems:'flex-start',
                flexWrap: 'wrap',
                border: 1,
                p:.2,
                m:3,
                minWidth:'400px',
                minHeight:'100px'
            }}>

                {presentData && presentData.map((item) => {
                    return (
                            <Chip
                                sx={{m:0.5, p:0}}
                                label={item.roll}
                                onDelete={(e) => {
                                    e.preventDefault();
                                    handlePresentDelete(item)
                                }}
                            />
                    );
                })
                }
            </Box>

            

                <Box component='form' onSubmit={handlePresentSubmit} noValidate sx={{m:3}} sx={{display:'flex'}}>
                    <Box>
                    <TextField
                        fullWidth
                        helperText='Enter student roll'
                        id="presentRolls"
                        type='number'
                        value={inputPresent}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                        onChange={(e) => { e.preventDefault(); setInputPresent(e.target.value) }}
                    />
                    </Box>
                    <Box sx={{ml:3, alignSelf:'center'}}>
                    <Button  variant="contained" type="submit">Enter</Button>
                    </Box>

                </Box>
            </Box>
        </Dialog>
    )
}

export default TopsheetDialog;