import { Box, Button, Container, Dialog, DialogTitle, Fade, Grow } from "@mui/material";
import { useEffect, useState } from "react";
import AutoCompleteTeacher from "../selector/autocompleteTeacher";

const ExaminerDialog = (props) => {
    const { open, onClose, semester, session, course } = props;

    const [examinerA, setExaminerA] = useState('')
    const [examinerB, setExaminerB] = useState('')
    const [loading, setLoading] = useState(true);
    const [List, setList] = useState([]);



    const getList = async () => {
        fetch('/api/admin/teacherList')
            .then(res => res.json())
            .then(data => {
                setList(data);
            });
    }

    const getAssignedList = async (e) => {
        setLoading(false);
        await fetch('/api/examCommittee/semester/getExaminer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session, course })
        })
            .then(res => res.json())
            .then(data => {
                if(data){
                    setExaminerA(data[0])
                    setExaminerB(data[1])
                }
            }
            )
        setLoading(true);
    }

    const handleSubmit = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (examinerA != '' & examinerB != '' && examinerA != examinerB) {
            var id = examinerA;
            var set = "A";
            await fetch('/api/examCommittee/semester/addExaminer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, session, course, set })
            })
                .then(res => res.json())
                .then(data => console.log())

            var set = "B";
            var id = examinerB;
            await fetch('/api/examCommittee/semester/addExaminer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, session, course, set })
            })
                .then(res => res.json())
                .then(data => console.log())
        }
        else {
            console.log('Error');
        }
    }
    useEffect(() => {
        getList();
    }, [])

    useEffect(() => {
        if (open == true)
            getAssignedList();
    }, [open])

    const handleOnClose = () => {
        onClose();
    }
    return (
        <Dialog TransitionComponent={Grow} fullWidth open={open} onClose={handleOnClose} sx={{ backdropFilter: 'blur(5px)' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300 }}>
                <DialogTitle>Add examiner</DialogTitle>
                <Container component='main' maxWidth='lg'>

                    {loading &&
                        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <AutoCompleteTeacher editable={examinerA? true : false} value={examinerA} sx={{ width: '350px', mb: 3 }} list={List} onChange={(value) => setExaminerA(value)} label="SET-A Examiner" />
                            <AutoCompleteTeacher editable={examinerB? true : false} value={examinerB} sx={{ width: '350px', mb: 3 }} list={List} onChange={(value) => setExaminerB(value)} label="SET-B Examiner" />
                            {!(examinerA && examinerB) ? <Button type='submit' variant="contained" sx={{ display: 'table', m: '0 auto', mb: 3 }}>Submit</Button>
                            : <Button variant="contained" sx={{ display: 'table', m: '0 auto', mb: 3 }}>Clear</Button>}

                        </Box>
                    }
                </Container>
            </Box>
        </Dialog>
    )
}

export default ExaminerDialog;