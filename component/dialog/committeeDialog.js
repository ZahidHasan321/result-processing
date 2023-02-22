import { INITIAL_STATE, memberReducer } from "@/helper/memberReducer";
import { Alert, Box, Button, Dialog, DialogTitle, Fade, Grow, TextField, Typography } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
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
    const [showAlert, setShowAlert] = useState(null);
    const [showError, setShowError] = useState(null);
    const [session, setSession] = useState('');
    const [semester, setSemester] = useState('');
    const [semesterList, setSemesterList] = useState([])

    const [state, dispatch] = useReducer(memberReducer, INITIAL_STATE);

    const getSemesterList = async () => {
        await fetch('/api/admin/courses/semesterList')
          .then(res => res.json())
          .then(data => {
            setSemesterList(data)
          })
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (session == '' || semester == '') {
            setShowError(true);

            setTimeout(() => {
                setShowError(false)
            }, 4000)
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
                setShowAlert(true);
                setSession('');
                setSemester('');
                dispatch({ type: 'RESET' });

                setTimeout(() => {
                    setShowAlert(false);
                }, 5000)
            }
            else {
                setShowError(true);

                setTimeout(() => {
                    setShowError(false)
                }, 4000)
            }
        })
    }

    useEffect(()=>{
        getSemesterList()
    },[])

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
                    <Box sx={{ display: 'flex', mb: 5 }}>
                        <TextField
                            sx={{ mr: 4 }}
                            margin="normal"
                            required
                            id="session"
                            label="Session"
                            name="session"
                            value={session}
                            onChange={(e) => { setSession(e.target.value); e.preventDefault() }}
                            autoFocus
                        />

                        <SemesterSelector  sx={{ width: '180px', mt:2 }} list={semesterList} value={semester} onChange={(value) => setSemester(value)} label='semester' />
                    </Box>

                    <Typography variant="caption" >Select committee members.(If role left empty by default they will be a member)</Typography>
                    <Box sx={{ display: 'flex', mb: 2,mt:1 }}>
                        <AutoCompleteTeacher sx={{ width: '350px', mr: 4 }} list={list} value={state.member1} onChange={(value) => { dispatch({ type: 'MEMBER1', payload: value }) }} label={'Member'} />
                        <BasicSelect sx={{ width: '200px' }} list={roles} value={state.role1} onChange={(value) => { dispatch({ type: 'ROLE1', payload: value }) }} label={'Role'} />
                    </Box>

                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <AutoCompleteTeacher sx={{ width: '350px', mr: 4 }} list={list} value={state.member2} onChange={(value) => { dispatch({ type: 'MEMBER2', payload: value }) }} label={'Member'} />
                        <BasicSelect sx={{ width: '200px' }} list={roles} value={state.role2} onChange={(value) => { dispatch({ type: 'ROLE2', payload: value }) }} label={'Role'} />
                    </Box>

                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <AutoCompleteTeacher sx={{ width: '350px', mr: 4 }} list={list} value={state.member3} onChange={(value) => { dispatch({ type: 'MEMBER3', payload: value }) }} label={'Member'} />
                        <BasicSelect sx={{ width: '200px' }} list={roles} value={state.role3} onChange={(value) => { dispatch({ type: 'ROLE3', payload: value }) }} label={'Role'} />
                    </Box>

                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <AutoCompleteTeacher sx={{ width: '350px', mr: 4 }} list={list} value={state.member4} onChange={(value) => { dispatch({ type: 'MEMBER4', payload: value }) }} label={'Member'} />
                        <BasicSelect sx={{ width: '200px' }} list={roles} value={state.role4} onChange={(value) => { dispatch({ type: 'ROLE4', payload: value }) }} label={'Role'} />
                    </Box>

                    <Box sx={{ display: 'flex', mb: 2 }}>
                        <AutoCompleteTeacher sx={{ width: '350px', mr: 4 }} list={list} value={state.member5} onChange={(value) => { dispatch({ type: 'MEMBER5', payload: value }) }} label={'Member'} />
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
                <Box width={300} sx={{ alignSelf: 'center' }}>
                    {
                        showAlert && <Alert severity='success'>Committee created successfully</Alert>
                    }
                    {
                        showError && <Alert severity='error'>ERROR has occured!!</Alert>
                    }
                </Box>
            </Box>

        </Dialog >
    )
}

export default CommitteeDialog;

