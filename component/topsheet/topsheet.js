
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Snackbar from "@mui/material/Snackbar"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import { useEffect, useState } from "react"
import ChipArray from "../chipComponent/chipArray"
import BasicSelect from "../selector/selector"


const periodList = [
    { id: "Morning", name: "Morning" },
    { id: "Afternoon", name: "Afternoon" }
]

const Topsheet = (props) => {
    const { set, course, semester, session } = props;

    const [presentData, setPresentData] = useState(null);
    const [absentData, setAbsentData] = useState(null);
    const [expelledData, setExpelledData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState({ open: false, message: '' });
    const [period, setPeriod] = useState('');

    const getList = async () => {
        await fetch('/api/examCommittee/semester/getTopsheet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session, course, set, type: 'present' })
        })
            .then(res => res.json())
            .then(data => setPresentData(data));

        await fetch('/api/examCommittee/semester/getTopsheet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session, course, set, type: 'absent' })
        })
            .then(res => res.json())
            .then(data => setAbsentData(data));

        await fetch('/api/examCommittee/semester/getTopsheet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session, course, set, type: 'expelled' })
        })
            .then(res => res.json())
            .then(data => setExpelledData(data));
    }

    const updatePresentData = (array) => {
        setPresentData([...array]);
    }

    const updateAbsentData = (array) => {
        setAbsentData([...array]);
    }

    const updateExpelledData = (array) => {
        setExpelledData([...array]);
    }

    const handleClick = async () => {
        const present = presentData.map((item) => {
            return item = { session: session, course: course, type: 'present', set: set, ...item }
        })

        const absent = absentData.map((item) => {
            return item = { session: session, course: course, type: 'absent', set: set, ...item }
        })

        const expelled = expelledData.map((item) => {
            return item = { session: session, course: course, type: 'expelled', set: set, ...item }
        })

        const list = present.concat(absent, expelled)
        if (list.length < 1) {
            setOpen({ open: true, message: 'Cannot submit empty topsheet' })
            return;
        };

        await fetch('/api/examCommittee/semester/addTotopsheet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(list)
        })
            .then(res => res.json())
            .then(data => {
                if (data == 'ok') {
                    setOpen({ open: true, message: 'Submitted Topsheet' })
                }
            })
    }

    const handlePresentDelete = (data, type) => {
        fetch('/api/examCommittee/semester/removeTopsheet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session, course, set, type, data })
        })
    }

    useEffect(() => {
        getList();
    }, [])

    setTimeout(() => {
        setLoading(false)
    }, 300)

    if (loading) {
        return (
            <Box  height={700} width={1200}>
                
            </Box>
        )
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Button sx={{ ml: 'auto', mr: 2, bgcolor: '#67be23', ":hover": { bgcolor: '#67be23' } }} variant='contained' onClick={handleClick}>Submit</Button>
            <Box sx={{ display: 'flex', alignSelf: 'flex-start', ml: 2, mb: 2 }}>

                <Typography fontSize={15} sx={{ mr: 1, mt:3}}>DEPARTMENT:</Typography>
                <TextField
                    sx={{mt:3}}
                    variant="standard"
                />

                <BasicSelect sx={{ width: 180, alignSelf: 'flex-start', ml: 3 }} list={periodList} value={period} onChange={(value) => setPeriod(value)} label="Time Period" />
            </Box>


            <Box sx={{ display: 'flex', alignSelf: 'flex-start', ml: 2, mb: 2 }}>

                <Typography fontSize={15} sx={{ mr: 1 }}>TOTAL ANSWER SHEET:</Typography>
                <TextField
                    sx={{ width: 80 }}
                    type='number'
                    variant="standard"
                />
            </Box>

            <Box sx={{ display: 'flex', alignSelf: 'flex-start', ml: 2, mb: 2 }}>
                <Typography fontSize={15} sx={{ mr: 1 }}>TOTAL EXTRA SHEET:</Typography>
                <TextField
                    sx={{ width: 80 }}
                    type='number'
                    variant="standard"
                />
            </Box>

            <Paper sx={{ border: 1, m: 2, boxShadow: 2 }}>
                <Typography textTransform={'uppercase'} fontWeight='bold' sx={{ textAlign: 'center' }} fontSize={16}>IDs of Present Students</Typography>
                {presentData && <ChipArray show={true} list={presentData} onDelete={(data) => handlePresentDelete(data, 'present')} updateData={updatePresentData} sx={{
                    minWidth: '700px',
                    maxWidth: '700px',
                    minHeight: '200px'
                }} />}
            </Paper>

            <Paper sx={{ border: 1, m: 2, boxShadow: 2 }}>
                <Typography textTransform={'uppercase'} fontWeight='bold' sx={{ textAlign: 'center' }} fontSize={16}>IDs of Absent Students</Typography>
                {absentData && <ChipArray list={absentData} onDelete={(data) => handlePresentDelete(data, 'absent')} updateData={updateAbsentData} sx={{
                    minWidth: '700px',
                    maxWidth: '700px',
                    minHeight: '100px'
                }} />}
            </Paper>

            <Paper sx={{ border: 1, m: 2, boxShadow: 2 }}>
                <Typography textTransform={'uppercase'} fontWeight='bold' sx={{ textAlign: 'center' }} fontSize={16}>IDs of Expelled Students</Typography>
                {expelledData && <ChipArray list={expelledData} onDelete={(data) => handlePresentDelete(data, 'expelled')} updateData={updateExpelledData} sx={{
                    minWidth: '700px',
                    maxWidth: '700px',
                    minHeight: '100px'
                }} />}
            </Paper>
            <Snackbar open={open.open} onClose={() => setOpen({ open: false, message: '' })} message={open.message} />

        </Box>
    )
}

export default Topsheet;