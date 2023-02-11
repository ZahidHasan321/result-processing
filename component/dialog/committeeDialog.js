import { INITIAL_STATE, memberReducer } from "@/helper/memberReducer";
import { Alert, Box, Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { useReducer, useState } from "react";
import BasicSelect from "../selector/selector";

const roles = [
    {id:'Chairman',name:'Chairman'},
    {id:'Tabulator',name:'Tabulator'},
    {id:'Member',name:'Member'}
]

const CommitteeDialog = (props) => {
    const{open, onClose, list} = props;
    const [showAlert, setShowAlert] = useState(true);
    const [showError, setShowError] = useState(null);
    const [session, setSession] = useState('');
    const [semester, setSemester] = useState('');

    const [state, dispatch] = useReducer(memberReducer, INITIAL_STATE);

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        console.log(state);
        await fetch('/api/admin/createCommittee',{
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({session, semester, ...state})
        }).then(res => 
            {
                if(res.ok)
                {
                    setShowAlert(true);
                    setTimeout(() => {
                        setShowAlert(false);
                    },5000)
                }
                else{
                    setShowError(true);

                    setTimeout(() => {
                        setShowError(false)
                    },4000)
                }
            })
    }

    function handleClose(){
        onClose();
    }
    return(
        <Dialog fullWidth maxWidth='md' open={open} onClose={handleClose} sx={{backdropFilter:'blur(5px)'}}> 
        <Box sx={{display:'flex', justifyContent:'center'}}>
        <DialogTitle sx={{fontWeight:'bold', fontSize:'3ex'}}>Create Committee</DialogTitle>
        </Box>
        
            <Box
                sx={{
                    marginTop: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    ml:2,
                    alignItems: 'baseline',
                }}
                >
            
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1}}>
                    <Box sx={{display:'flex', mb:5}}>
                    <TextField
                    sx={{mr:2}}
                    margin="normal"
                    required
                    id="session"
                    label="Session"
                    name="session"
                    value={session}
                    onChange={(e) => {setSession(e.target.value); e.preventDefault()}}
                    autoFocus
                    />

                    <TextField
                    margin="normal"
                    required
                    id="semester"
                    label="Semester"
                    name="semester"
                    value={semester}
                    onChange={(e) => {setSemester(e.target.value); e.preventDefault()}}
                    autoFocus
                    />
                    </Box>

                    <Box sx={{display:'flex', mb:2}}>
                    <BasicSelect sx={{width:'350px', mr:4}} list={list} value={state.member1} onChange={(value) => {dispatch({type:'MEMBER1', payload:value})}} label={'Member'}/>
                    <BasicSelect sx={{width:'200px'}} list={roles} value={state.role1} onChange={(value) => {dispatch({type:'ROLE1', payload:value})}} label={'Role'}/>
                    </Box>

                    <Box sx={{display:'flex', mb:2}}>
                    <BasicSelect sx={{width:'350px', mr:4}} list={list} value={state.member2} onChange={(value) => {dispatch({type:'MEMBER2', payload:value})}} label={'Member'}/>
                    <BasicSelect sx={{width:'200px'}} list={roles} value={state.role2} onChange={(value) => {dispatch({type:'ROLE2', payload:value})}} label={'Role'}/>
                    </Box>

                    <Box sx={{display:'flex', mb:2}}>
                    <BasicSelect sx={{width:'350px', mr:4}} list={list} value={state.member3} onChange={(value) => {dispatch({type:'MEMBER3', payload:value})}} label={'Member'}/>
                    <BasicSelect sx={{width:'200px'}} list={roles} value={state.role3} onChange={(value) => {dispatch({type:'ROLE3', payload:value})}} label={'Role'}/>
                    </Box>

                    <Box sx={{display:'flex', mb:2}}>
                    <BasicSelect sx={{width:'350px', mr:4}} list={list} value={state.member4} onChange={(value) => {dispatch({type:'MEMBER4', payload:value})}} label={'Member'}/>
                    <BasicSelect sx={{width:'200px'}} list={roles} value={state.role4} onChange={(value) => {dispatch({type:'ROLE4', payload:value})}} label={'Role'}/>
                    </Box>

                    <Box sx={{display:'flex', mb:2}}>
                    <BasicSelect sx={{width:'350px', mr:4}} list={list} value={state.member5} onChange={(value) => {dispatch({type:'MEMBER5', payload:value})}} label={'Member'}/>
                    <BasicSelect sx={{width:'200px'}} list={roles} value={state.role5} onChange={(value) => {dispatch({type:'ROLE5', payload:value})}} label={'Role'}/>
                    </Box>
                    <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2}}
                    >
                    SUBMIT
                    </Button>
                </Box>
                <Box width={300} sx={{alignSelf:'center', zIndex:99, postion:'absolute', mb:2}}>
                {
                    showAlert && <Alert severity='success'>Teacher Added</Alert>
                }
                {
                    showError && <Alert severity='error'>Email already exists</Alert>
                }
                </Box>
                </Box>
                
        </Dialog>
    )
}

export default CommitteeDialog;

