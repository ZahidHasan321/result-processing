import { INITIAL_STATE, memberReducer } from "@/helper/memberReducer";
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Snackbar from "@mui/material/Snackbar"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import Grow from "@mui/material/Grow"

import { useEffect, useReducer, useState } from "react";
import AutoCompleteSession from "../selector/autocompleteSession";
import AutoCompleteTeacher from "../selector/autocompleteTeacher";
import BasicSelect from "../selector/selector";
import SemesterSelector from "../selector/semesterSelector";

const roles = [
    { id: 'Chairman', name: 'Chairman' },
    { id: 'Tabulator', name: 'Tabulator' },
    { id: 'Member', name: 'Member' }
]

const CommitteeDialog = (props) => {
    const { open, onClose, list } = props;
    const [session, setSession] = useState('');
    const [semester, setSemester] = useState('');
    const [semesterList, setSemesterList] = useState([])
    const [sessionList, setSessionList] = useState([])
    const [snackbar, setSnackbar] = useState(null);

    const [state, dispatch] = useReducer(memberReducer, INITIAL_STATE);


    const getSemesterList = async () => {
        await fetch('/api/admin/courses/semesterList')
            .then(res => res.json())
            .then(data => {
                setSemesterList(data)
            })
    }

    const getSessionList = () => {
        fetch('/api/admin/student/getStudentSession')
            .then(res => res.json())
            .then(data => setSessionList(data))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (session === null || session === '' || semester === '') {
            setSnackbar({ children: 'Semester or session cannot be empty', severity: 'error' })
            return;
        }

        await fetch('/api/admin/createCommittee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session, semester, ...state })
        }).then(res => {
            if (res.ok) {
                setSnackbar({ children: 'Committee Created Successfully', severity: 'success' })
                setSession(null);
                setSemester('');
                dispatch({ type: 'RESET' });
            }
            else {
                setSnackbar({ children: 'Failed to create committee', severity: 'error' })
            }
        })
    }

    useEffect(() => {
        getSessionList()
        getSemesterList()
    }, [])

    function handleClose() {
        onClose();
    }
    return (
        <Dialog TransitionComponent={Grow} fullWidth maxWidth='md' open={open} onClose={handleClose} sx={{ backdropFilter: 'blur(5px)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <DialogTitle sx={{ fontWeight: 'bold', fontSize: '3ex' }}>Create Committee</DialogTitle>
            </Box>
            <Box
                sx={{
                    marginTop: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    ml: 2,
                    alignItems: 'center',
                }}
            >

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                    <Typography>Select exam session and semester</Typography>
                    <Box sx={{ display: 'flex', mb: 5, mt:1}}>
                        <AutoCompleteSession sx={{ width: '180px' }} value={{exam_session: session}} list={sessionList} onChange={(value) => setSession(value)} label='Exam Session' />

                        <SemesterSelector sx={{ width: '180px', ml: 5 }} list={semesterList} value={semester} onChange={(value) => setSemester(value)} label='semester' />
                    </Box>

                    <Typography variant="caption" >Select committee members.(If role left empty by default they will be a member)</Typography>
                    <Box sx={{ display: 'flex', mb: 2, mt: 1 }}>
                        <AutoCompleteTeacher sx={{ width: '350px', mr: 4 }} list={list} value={state.member1 ? JSON.parse(JSON.stringify(state.member1)):null} onChange={(value) => { dispatch({ type: 'MEMBER1', payload: value }) }} label={'Member'} />
                        <BasicSelect sx={{ width: '200px' }} list={roles} value={state.role1} onChange={(value) => { dispatch({ type: 'ROLE1', payload: value }) }} label={'Role'} />
                    </Box>

                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <AutoCompleteTeacher sx={{ width: '350px', mr: 4 }} list={list} value={state.member2 ? JSON.parse(JSON.stringify(state.member2)) : null} onChange={(value) => { dispatch({ type: 'MEMBER2', payload: value }) }} label={'Member'} />
                        <BasicSelect sx={{ width: '200px' }} list={roles} value={state.role2} onChange={(value) => { dispatch({ type: 'ROLE2', payload: value }) }} label={'Role'} />
                    </Box>

                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <AutoCompleteTeacher sx={{ width: '350px', mr: 4 }} list={list} value={state.member3  ? JSON.parse(JSON.stringify(state.member3)) : null} onChange={(value) => { dispatch({ type: 'MEMBER3', payload: value }) }} label={'Member'} />
                        <BasicSelect sx={{ width: '200px' }} list={roles} value={state.role3} onChange={(value) => { dispatch({ type: 'ROLE3', payload: value }) }} label={'Role'} />
                    </Box>

                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <AutoCompleteTeacher sx={{ width: '350px', mr: 4 }} list={list} value={state.member4  ?JSON.parse(JSON.stringify(state.member4)) : null} onChange={(value) => { dispatch({ type: 'MEMBER4', payload: value }) }} label={'Member'} />
                        <BasicSelect sx={{ width: '200px' }} list={roles} value={state.role4} onChange={(value) => { dispatch({ type: 'ROLE4', payload: value }) }} label={'Role'} />
                    </Box>

                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <AutoCompleteTeacher sx={{ width: '350px', mr: 4 }} list={list} value={state.member5 ? JSON.parse(JSON.stringify(state.member5)) : null} onChange={(value) => { dispatch({ type: 'MEMBER5', payload: value }) }} label={'Member'} />
                        <BasicSelect sx={{ width: '200px' }} list={roles} value={state.role5} onChange={(value) => { dispatch({ type: 'ROLE5', payload: value }) }} label={'Role'} />
                    </Box>
                    <Box sx={{ display: 'table', m: '0 auto' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            SUBMIT
                        </Button>
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

        </Dialog >
    )
}

export default CommitteeDialog;

