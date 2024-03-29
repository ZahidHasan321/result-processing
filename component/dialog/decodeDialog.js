import CloseIcon from '@mui/icons-material/Close';
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import Grow from "@mui/material/Grow";
import Snackbar from "@mui/material/Snackbar";
import { Typography } from '@mui/material';
import { GridToolbar } from '@mui/x-data-grid';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from "react";
import AntDesignGrid from "../customDatagrid/customDatagrid";
import ConfirmDialog from './ConfirmDialog';



const DecodeDialog = (props) => {

    const { status, userData } = useSession()

    if (status === "loading") {
        return <p>Loading...</p>
    }

    if (status === 'unauthenticated') {
        Router.replace('auth/signin');
    }

    const { open, onClose, data, editableData, sx, showName } = props;
    const [marks, setMarks] = useState(null);
    const [checked, setChecked] = useState(false);
    const [snackbar, setSnackbar] = useState(null);
    const [submittedData, setSubmittedData] = useState(null);
    const [openBackdrop, setOpenBackdrop] = useState(true);
    const [openConfirm, setOpenConfirm] = useState(false);

    const handleCloseSnackbar = () => setSnackbar(null);

    const handleOnClose = () => {
        onClose();
    }
    const handleOnSubmit = () => {
        setOpenConfirm(true)
    }

    function hasDuplicates(array) {
        const list = array.map((item) => item.roll)
        return (new Set(list)).size !== list.length;
    }

    const handleOnConfirm = async () => {
        if (marks) {
            if (hasDuplicates(marks)) {
                setSnackbar({ children: 'Please remove duplicate rolls', severity: 'error' })
            }
            else {
                await fetch('/api/examCommittee/semester/submitDecode', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ session: data.exam_session, course: data.course_code, set: data.set_number, marks })
                })
                    .then(res => res.json())
                    .then(data => {
                        onClose(data)
                    })
                localStorage.removeItem(data.exam_session + data.course_code + data.set_number + 'decode');
            }
        }
    }


    useEffect(() => {
        if (submittedData && submittedData.length > 0) {
            var list = []
            submittedData.map((item) => {
                const found = list.findIndex(element => element.code === item.code)

                if (found != -1) list[found][item.question] = item.mark
                else {
                    const object = { code: item.code, name: item.name, roll: item.roll, [item.question]: item.mark, }
                    list.push(object)
                }
            })
            setMarks(list);
            localStorage.setItem(data.exam_session + data.course_code + data.set_number + 'decode', JSON.stringify(list));
        }

    }, [submittedData])

    setTimeout(() => {
        setOpenBackdrop(false);
        setChecked(true)
    }, 500)


    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem(data.exam_session + data.course_code + data.set_number + 'decode'));
        if (savedData && savedData.length > 0) {
            setMarks(savedData);
        }
        else {
            fetch('/api/examCommittee/semester/getMarks', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ session: data.exam_session, course: data.course_code, set: data.set_number })
            })
                .then(res => res.json())
                .then(data => setSubmittedData(data))
        }
    }, []);

    const ProcessRowUpdate = async (newRow, oldRow) => {
        if (JSON.stringify(newRow) === JSON.stringify(oldRow)) return oldRow
        if (marks) {
            const temp = marks.map((item) => {
                if (item.code == newRow.code) {
                    return newRow;
                }
                else return item;
            })
            setMarks(temp);
            localStorage.setItem(data.exam_session + data.course_code + data.set_number + 'decode', JSON.stringify(temp));
            setSnackbar({ children: 'Saved', serverity: 'sucesss' })
        }
        return newRow;
    }

    const handleProcessRowUpdateError = () => {
        setSnackbar({ children: "Error while saving", serverity: 'error' })
    };

    const preProcessEditCellProps = (params) => {
        const hasError = isNaN(params.props.value)
        if (hasError) setSnackbar({ children: "Not A Number", serverity: 'error' })

        return { ...params.props, error: hasError };
    }

    const getTotal = (params) => {
        if ((params.row.Q1) || (params.row.Q2) || (params.row.Q3) || (params.row.Q4) || (params.row.Q5) || (params.row.Q6) || (params.row.Q7) || (params.row.Q8) || (params.row.Q9) || (params.row.Q10)) {
            const total = (+(params.row.Q1 ? params.row.Q1 : null)) + (+(params.row.Q2 ? params.row.Q2 : null)) + (+(params.row.Q3 ? params.row.Q3 : null)) + (+(params.row.Q4 ? params.row.Q4 : null)) + (+(params.row.Q5 ? params.row.Q5 : null)) + (+(params.row.Q6 ? params.row.Q6 : null)) + (+(params.row.Q7 ? params.row.Q7 : null)) + (+(params.row.Q8 ? params.row.Q8 : null)) + (+(params.row.Q9 ? params.row.Q9 : null)) + (+(params.row.Q10 ? params.row.Q10 : null));
            return total;
        }
        else {
            return null;
        }
    }

    const columns = [
        {
            field: "code",
            headerName: "Paper Code",
            minWidth: 120,
        },

        {
            field: "roll",
            headerName: "Roll No",
            minWidth: 150,
            editable: true,
            preProcessEditCellProps
        },
        {
            field: "name",
            headerName: "Student Name",
            minWidth: 200,
            flex: 1,
            hide: showName
        },
        {
            field: "Q1",
            headerName: "Q1",
            minWidth: 30,
            flex: 1
        },
        {
            field: "Q2",
            headerName: "Q2",
            minWidth: 30,
            flex: 1
        },
        {
            field: "Q3",
            headerName: "Q3",
            minWidth: 30,
            flex: 1
        },
        {
            field: "Q4",
            headerName: "Q4",
            minWidth: 30,
            flex: 1
        },
        {
            field: "Q5",
            headerName: "Q5",
            minWidth: 30,
            flex: 1
        },
        {
            field: "Q6",
            headerName: "Q6",
            minWidth: 30,
            flex: 1
        },
        {
            field: "Q7",
            headerName: "Q7",
            minWidth: 30,
            flex: 1
        },
        {
            field: "Q8",
            headerName: "Q8",
            minWidth: 30,
            flex: 1
        },
        {
            field: "Q9",
            headerName: "Q9",
            minWidth: 30,
            flex: 1
        },
        {
            field: "Q10",
            headerName: "Q10",
            minWidth: 30,
            flex: 1
        },
        {
            field: "Total",
            headerName: "Total",
            minWidth: 70,
            valueGetter: getTotal
        },
    ]

    return (
        <Box>
            <Dialog TransitionComponent={Grow} fullWidth maxWidth='xl' open={open} sx={{ ...sx, backdropFilter: 'blur(5px)' }} PaperProps={{ sx: { minHeight: 750 } }}>
                <Button size='small' sx={{ width: 30, m: 1, ml: 'auto' }} onClick={handleOnClose}><CloseIcon htmlColor='red' /></Button>

                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography fontWeight={'bold'} textAlign={'center'} fontSize={30} >Decode Paper Code</Typography>
                    <Typography textAlign={'center'} fontSize={20}>Course Name: {data.course_name}</Typography>
                    <Typography textAlign={'center'} fontSize={20}>Course Code: {data.course_code}</Typography>
                    <Typography textAlign={'center'} fontSize={20}> Session: {data.exam_session} </Typography>
                </Box>
                <Box sx={{ ml: 5, mr: 5, mb: 3, display: 'flex', flexDirection: 'column', mt: 2 }}>
                    <Button variant='contained' sx={{ ml: 'auto', mb: 2, bgcolor: '#67be23', ":hover": { bgcolor: '#67be23' } }} onClick={handleOnSubmit}>Submit</Button>
                    {marks &&
                        <AntDesignGrid
                            sx={{ boxShadow: 3, fontSize: '16px' }}
                            getRowId={row => row.code}
                            autoHeight
                            columns={columns}
                            rows={marks}
                            checked={checked}
                            experimentalFeatures={{ newEditingApi: true }}
                            processRowUpdate={ProcessRowUpdate}
                            onProcessRowUpdateError={handleProcessRowUpdateError}
                            disableColumnSelector
                            disableDensitySelector
                            component={{ Toolbar: GridToolbar }}
                            componentsProps={{
                                toolbar: {
                                    csvOptions: { disableToolbarButton: true },
                                    printOptions: { disableToolbarButton: true },
                                    showQuickFilter: true,
                                    quickFilterProps: { debounceMs: 250 },
                                },
                            }}
                        />}
                </Box>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openBackdrop}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

                <ConfirmDialog open={openConfirm} message={'Are you sure you want to submit?'} onConfirm={handleOnConfirm} onClose={() => setOpenConfirm(false)} label={'Submit'} />

                {!!snackbar && (
                    <Snackbar
                        open
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        onClose={handleCloseSnackbar}
                        autoHideDuration={3000}
                    >
                        <Alert {...snackbar} onClose={handleCloseSnackbar} />
                    </Snackbar>
                )}
            </Dialog>
        </Box>
    )

}

export default DecodeDialog;