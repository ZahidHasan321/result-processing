import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Snackbar from "@mui/material/Snackbar"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import Grow from "@mui/material/Grow"


import { useEffect, useState } from "react";
import AutoCompleteTeacher from "../selector/autocompleteTeacher";

const ExaminerDialog = (props) => {
    const { open, onClose, semester, session, course } = props;

    const [examinerA, setExaminerA] = useState('')
    const [examinerB, setExaminerB] = useState('')
    const [courseTeacher, setCourseTeacher] = useState('');
    const [loading, setLoading] = useState(true);
    const [List, setList] = useState([]);
    const [snackbar, setSnackbar] = useState(null);



    const getList = async () => {
        fetch('/api/admin/teacherList')
            .then(res => res.json())
            .then(data => {
                setList(data);
            });
    }

    const getAssignedList = async (e) => {
        var f = false;
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
        var f = false;
        if (examinerA != '' && examinerB != '' && examinerA != null && examinerB != null) {
            var id_a = examinerA;
            var id_b = examinerB;

            if (typeof examinerA === 'object' && examinerA !== null) {
                id_a = examinerA.id;
            }

            if (typeof examinerB === 'object' && examinerB !== null) {
                id_b = examinerB.id;
            }

            if (id_a !== id_b) {
                f == true;
                await fetch('/api/examCommittee/semester/addExaminer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: id_a, session, course, set: 'A' })
                })


                await fetch('/api/examCommittee/semester/addExaminer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: id_b, session, course, set: 'B' })
                })
                
                setSnackbar({ children: "Examiners assigned to course", severity: 'success' })
                
            }
            else {
                f == true;
                setSnackbar({ children: "Both sets cannot have same examiner", severity: 'error' })
                
            }
        }

        var id = courseTeacher;
        if (typeof courseTeacher === 'object' && courseTeacher !== null) {
            id = courseTeacher.id;
        }

        if (id !== '' && id !== null && courseTeacher != null) {
            await fetch('/api/examCommittee/semester/addCourseTeacher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, session, course })
            })

             if(f == true) setSnackbar({ children: "Course Teacher assigned", severity: 'success' })
        }
        else{
            setSnackbar({ children: "Examiner cannot be left empty", severity: 'error' })
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
                            <AutoCompleteTeacher value={examinerA} sx={{ width: '350px', mb: 3 }} list={List} onChange={(value) => setExaminerA(value)} label="SET-B Examiner" />
                            <AutoCompleteTeacher value={examinerB} sx={{ width: '350px', mb: 3 }} list={List} onChange={(value) => setExaminerB(value)} label="SET-B Examiner" />
                            <Typography fontWeight={'bold'}>Add Course Teacher</Typography>
                            <AutoCompleteTeacher value={courseTeacher} sx={{ width: '350px', mb: 3 }} list={List} onChange={(value) => setCourseTeacher(value)} label="Course Teacher" />
                            <Button type='submit' variant="contained" sx={{ display: 'table', m: '0 auto', mb: 3 }}>Submit</Button>
                        </Box>
                    }
                </Container>
            </Box>
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
        </Dialog>
    )
}

export default ExaminerDialog;