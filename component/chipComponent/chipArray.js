
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"

const ChipArray = (props) => {
    const { list, updateData, sx, onDelete, show } = props;
    const [input, setInput] = useState('');
    const [array, setArray] = useState(list);
    const [snackbar, setSnackbar] = useState()
    const [startValue, setStartValue] = useState('')
    const [endValue, setEndValue] = useState('')


    const handleSubmit = (event) => {
        event.preventDefault();
        var isPresent = array.some((item) => item.roll == input);

        if (isPresent)
            setSnackbar({ children: 'Number is already present', severity: 'error' });
        else if (input.length > 9)
            setSnackbar({ children: 'Number is too big', severity: 'error' });
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

    const handleRangeInput = () => {
        if (startValue >= endValue && startValue < 0) {
            setSnackbar({ children: 'Not a range', severity: 'error' });
        }

        var temp = [];

        for (let i = startValue; i <= endValue; i++) {
            temp.push({roll: i+''});
        }

        temp.map((item) => {
            var isPresent = array.some((arr) => arr.roll == item.roll);

            if(!isPresent){
                setArray((array) => [...array, item])
            }

        })
    }

    return (
        <Box sx={{ display: 'flex' }}>

            <Box component='form' onSubmit={handleSubmit} noValidate sx={{ m: 3, display: 'flex', mt: 5 }}>
                <Box sx={show && { display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        sx={{ maxWidth: 200 }}
                        autoComplete="off"
                        helperText='Enter student roll'
                        id="presentRolls"
                        type='number'
                        value={input}
                        onChange={(e) => { e.preventDefault(); setInput(e.target.value) }}
                    />
                    <Box sx={{ mb: 2 }}>
                        <Button type="submit" variant="contained" >Enter</Button>
                        <Button onClick={() => { setArray([]); updateData(array) }} sx={{ ml: 2 }}>Clear</Button>
                    </Box>

                    {show && <Box> <Box sx={{ display: 'flex' }}>
                        <TextField
                            autoComplete="off"
                            sx={{ maxWidth: 150 }}
                            helperText='Enter student roll'
                            id="start"
                            type='number'
                            value={startValue}
                            onChange={(e) => { e.preventDefault(); setStartValue(e.target.value) }}
                        />
                        <TextField
                            autoComplete="off"
                            sx={{ ml: 3, maxWidth: 150 }}
                            helperText='Enter student roll'
                            id="end"
                            type='number'
                            value={endValue}
                            onChange={(e) => { e.preventDefault(); setEndValue(e.target.value) }}
                        />

                    </Box>
                        <Button onClick={handleRangeInput} variant="contained" sx={{ alignSelf: 'start' }}>Enter Range</Button>
                    </Box>
                    }
                </Box>



            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="body2" sx={{ justifySelf: 'center', alignSelf: 'flex-end', mr: 3 }}>Total: {array.length}</Typography>
                <Box

                    sx={{
                        ...sx,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignContent: 'flex-start',
                        flexWrap: 'wrap',
                        border: 1,
                        p: .2,
                        mb: 2,
                        ml: 0,
                        mr: 3,
                        mt: 1

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
            </Box>

            {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={() => { setSnackbar(null) }}
                    autoHideDuration={3000}
                >
                    <Alert {...snackbar} onClose={(() => { setSnackbar(null) })} />
                </Snackbar>
            )}

        </Box>
    )
}

export default ChipArray;