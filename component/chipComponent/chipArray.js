import { Box, Button, Chip, Snackbar, SnackbarContent, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const ChipArray = (props) => {
    const { list, updateData, sx } = props;
    const [input, setInput] = useState('');
    const [array, setArray] = useState(list);
    const [open, setOpen] = useState({ open: false, messsage: '' });

    const handleSubmit = (event) => {
        event.preventDefault();

        var isPresent = array.some((item) => item.roll === input);

        if (isPresent)
            setOpen({ open: true, messsage: 'Number is already Present' });
        else if (input.length > 9)
            setOpen({ open: true, messsage: 'Number is too big' });
        else if (!isPresent && input != '') {
            setArray(array => [...array, { roll: input }]);
        }

    }

    const handleDelete = (item) => {
        setArray((students) => students.filter((student) => student.roll !== item.roll));
    }

    useEffect(() => {
        updateData(array);
    }, [array])


    return (
        <Box sx={{ display: 'flex' }}>
            <Box component='form' onSubmit={handleSubmit} noValidate sx={{ m: 3, display: 'flex', mt: 5 }}>
                <Box>
                    <TextField
                        fullWidth
                        helperText='Enter student roll'
                        id="presentRolls"
                        type='number'
                        value={input}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        onChange={(e) => { e.preventDefault(); setInput(e.target.value) }}
                    />
                </Box>
                <Box sx={{ ml: 2 }}>
                    <Button variant="contained" type="submit">Enter</Button>
                    <Button onClick={() => setArray([])} sx={{ ml: 2 }}>Clear</Button>
                </Box>

            </Box>

            <Box
            
            sx={{
                ...sx,
                display: 'flex',
                justifyContent: 'flex-start',
                alignContent: 'flex-start',
                flexWrap: 'wrap',
                border: 1,
                p: .2,
                m: 3,

            }}>

                {array && array.map((item) => {
                    return (
                        <Chip
                            sx={{ m: 0.5, p: 0 }}
                            label={item.roll}
                            key={item.roll}
                            onDelete={(e) => {
                                e.preventDefault();
                                handleDelete(item)
                            }}
                        />
                    );
                })
                }
            </Box>
            <Snackbar open={open.open} autoHideDuration={4000} onClose={() => { setOpen(false) }} message={open.messsage} />

        </Box>
    )
}

export default ChipArray;