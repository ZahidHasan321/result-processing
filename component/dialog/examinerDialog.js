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

    const [examinerA, setExaminerA] = useState(null)
    const [examinerB, setExaminerB] = useState(null)
    const [courseTeacher, setCourseTeacher] = useState('');
    const [loading, setLoading] = useState(false);
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
        if(examinerA === null && examinerB === null && courseTeacher === null){
            setSnackbar({ children: "Examiner cannot be left empty", severity: 'error' });
            return;
        } 
        var f = false;
        if (examinerA != null && examinerB != null) {
            if (examinerA.id !== examinerB.id) {
                f = true;
                await fetch('/api/examCommittee/semester/addExaminer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: examinerA.id, session, course, set: 'A' })
                })


                await fetch('/api/examCommittee/semester/addExaminer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: examinerB.id, session, course, set: 'B' })
                })
                
                setSnackbar({ children: "Examiners assigned to course", severity: 'success' })
                
            }
            else {
                f = true;
                setSnackbar({ children: "Both sets cannot have same examiner", severity: 'error' })
            }
        }

        if (courseTeacher != null) {
            await fetch('/api/examCommittee/semester/addCourseTeacher', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: courseTeacher.id, session, course })
            })

            if(f=== false) setSnackbar({ children: "Course Teacher assigned", severity: 'success' })
        }
    }
    useEffect(() => {
        getList();
        getAssignedList();
    }, [])

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
                            <AutoCompleteTeacher value={examinerA ? examinerA : null} sx={{ width: '350px', mb: 3 }} list={List} onChange={(value) => setExaminerA(value)} label="SET-B Examiner" />
                            <AutoCompleteTeacher value={examinerB ? examinerB : null} sx={{ width: '350px', mb: 3 }} list={List} onChange={(value) => setExaminerB(value)} label="SET-B Examiner" />
                            <Typography fontWeight={'bold'}>Add Course Teacher</Typography>
                            <AutoCompleteTeacher value={courseTeacher  ? courseTeacher : null} sx={{ width: '350px', mb: 3 }} list={List} onChange={(value) => setCourseTeacher(value)} label="Course Teacher" />
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