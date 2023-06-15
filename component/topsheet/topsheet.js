
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Snackbar from "@mui/material/Snackbar"
import Typography from "@mui/material/Typography"

import { useEffect, useState } from "react"
import ChipArray from "../chipComponent/chipArray"
import ConfirmDialog from "../dialog/ConfirmDialog"
import { Alert } from "@mui/material"


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
    const [openConfirm, setOpenConfirm] = useState(false);
    const [snackbar, setSnackbar] = useState(null);

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

    const handleOnSubmit = () => {
        setOpenConfirm(true);
    }

    const handleOnConfirm = async () => {
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
            setSnackbar({ children: 'Cannot submit empty topsheet', severiy:'error' })
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
                setSnackbar(data)
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
            <Button sx={{ ml: 'auto', mr: 2, bgcolor: '#67be23', ":hover": { bgcolor: '#67be23' } }} variant='contained' onClick={handleOnSubmit}>Submit</Button>

            <Paper sx={{ m: 2, boxShadow: 2 }}>
                <Typography textTransform={'uppercase'} fontWeight='bold' sx={{ textAlign: 'center', mt:2 }} fontSize={16}>Present Students</Typography>
                {presentData && <ChipArray show={true} list={presentData} onDelete={(data) => handlePresentDelete(data, 'present')} updateData={updatePresentData} sx={{
                    minWidth: '700px',
                    maxWidth: '700px',
                    minHeight: '200px'
                }} />}
            </Paper>

            <Paper sx={{ m: 2, boxShadow: 2 }}>
                <Typography textTransform={'uppercase'} fontWeight='bold' sx={{ textAlign: 'center', mt:2}} fontSize={16}>Absent Students</Typography>
                {absentData && <ChipArray list={absentData} onDelete={(data) => handlePresentDelete(data, 'absent')} updateData={updateAbsentData} sx={{
                    minWidth: '700px',
                    maxWidth: '700px',
                    minHeight: '100px'
                }} />}
            </Paper>

            <Paper sx={{ m: 2, boxShadow: 2 }}>
                <Typography textTransform={'uppercase'} fontWeight='bold' sx={{ textAlign: 'center', mt:2 }} fontSize={16}>Expelled Students</Typography>
                {expelledData && <ChipArray list={expelledData} onDelete={(data) => handlePresentDelete(data, 'expelled')} updateData={updateExpelledData} sx={{
                    minWidth: '700px',
                    maxWidth: '700px',
                    minHeight: '100px'
                }} />}
            </Paper>
            {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={() => { setSnackbar(null) }}
                    autoHideDuration={5000}
                >
                    <Alert {...snackbar} onClose={(() => { setSnackbar(null) })} />
                </Snackbar>
            )}
            <ConfirmDialog open={openConfirm} message={'Are you sure you want to submit?'} onConfirm={handleOnConfirm} onClose={() => setOpenConfirm(false)} label={'Submit'} />

        </Box>
    )
}

export default Topsheet;