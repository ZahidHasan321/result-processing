import { Box, Button, Chip, Snackbar, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const ChipArray = (props) => {
    const { list, updateData, sx, onDelete } = props;
    const [input, setInput] = useState('');
    const [array, setArray] = useState(list);
    const [open, setOpen] = useState({ open: false, messsage: '' })
    

    const handleSubmit = (event) => {
        event.preventDefault();

        var isPresent = array.some((item) => item.roll == input);

        if (isPresent)
            setOpen({ open: true, messsage: 'Number is already present' });
        else if (input.length > 9)
            setOpen({ open: true, messsage: 'Number is too big' });
        else if (!isPresent && input != '') {
            setArray(array => [...array, { roll: input }]);
        }

    }

    const handleDelete = (item) => {
        setArray((students) => students.filter((student) => student.roll !== item.roll));
        onDelete(item.roll);
    }

    useEffect(() => {
        updateData(array);
    }, [array])

    return (
        <Box sx={{ display: 'flex' }}>
            <Box noValidate sx={{ m: 3, display: 'flex', mt: 5 }}>
                <Box>
                    <TextField
                        fullWidth
                        helperText='Enter student roll'
                        id="presentRolls"
                        type='number'
                        value={input}
                        onChange={(e) => { e.preventDefault(); setInput(e.target.value) }}
                    />
                </Box>
                <Box sx={{ ml: 2 }}>
                    <Button variant="contained" onClick={handleSubmit}>Enter</Button>
                    <Button onClick={() => { setArray([]); updateData(array) }} sx={{ ml: 2 }}>Clear</Button>
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