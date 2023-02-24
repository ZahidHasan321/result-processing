import { Box, Button, Container, Dialog, DialogTitle, Fade, Grow, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AutoCompleteTeacher from "../selector/autocompleteTeacher";

const ExaminerDialog = (props) => {
    const { open, onClose, semester, session, course } = props;

    const [examinerA, setExaminerA] = useState('')
    const [examinerB, setExaminerB] = useState('')
    const [courseTeacher, setCourseTeacher] = useState('');
    const [loading, setLoading] = useState(true);
    const [List, setList] = useState([]);
    const [barOpen, setBarOpen] = useState({ open: false, color: '', message: '' });



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
                if (data) {
                    setExaminerA(data[0])
                    setExaminerB(data[1])
                }
            }
            )

        await fetch('/api/examCommittee/semester/getCourseTeacher', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session, course })
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setCourseTeacher(data[0])
                }
            }
            )

        setLoading(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (examinerA != '' && examinerB != '' && examinerA != null && examinerB != null && courseTeacher != '' && courseTeacher != null) {
            if (examinerA !== examinerB) {
                var id = examinerA;
                var set = "A";
                await fetch('/api/examCommittee/semester/addExaminer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id, session, course, set, number: 1 })
                })

                var set = "B";
                var id = examinerB;
                await fetch('/api/examCommittee/semester/addExaminer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id, session, course, set, number: 2 })
                })

                await fetch('/api/examCommittee/semester/addCourseTeacher', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: courseTeacher, session, course })
                })

                setBarOpen({ open: true, message: 'Examiners Assigned' });

            }
            else {
                setBarOpen({ open: true, message: 'Examiners have to different' });
            }
        }
        else {
            setBarOpen({ open: true, message: 'Cannot be empty' });
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
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 400 }}>
                <DialogTitle>Add examiners</DialogTitle>
                <Container component='main' maxWidth='lg'>

                    {loading &&
                        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <AutoCompleteTeacher value={examinerA} sx={{ width: '350px', mb: 3 }} list={List} onChange={(value) => setExaminerA(value)} label="SET-A Examiner" />
                            <AutoCompleteTeacher value={examinerB} sx={{ width: '350px', mb: 3 }} list={List} onChange={(value) => setExaminerB(value)} label="SET-B Examiner" />
                            <Typography fontWeight={'bold'}>Add Course Teacher</Typography>
                            <AutoCompleteTeacher value={courseTeacher} sx={{ width: '350px', mb: 3 }} list={List} onChange={(value) => setCourseTeacher(value)} label="Course Teacher" />
                            <Button type='submit' variant="contained" sx={{ display: 'table', m: '0 auto', mb: 3 }}>Submit</Button>
                        </Box>
                    }
                </Container>
            </Box>
            <Snackbar open={barOpen.open} autoHideDuration={5000} onClose={() => setBarOpen(false)} message={barOpen.message} />
        </Dialog>
    )
}

export default ExaminerDialog;