import CloseIcon from '@mui/icons-material/Close';
import Alert from "@mui/material/Alert"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import Snackbar from "@mui/material/Snackbar"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import Grow from "@mui/material/Grow"


import { useEffect, useState } from "react";
import AntDesignGrid from "../customDatagrid/customDatagrid";



const MarksheetDialog = (props) => {
    const { open, onClose, data, editableData, sx } = props;
    const [marks, setMarks] = useState(null);
    const [checked, setChecked] = useState(false);
    const [snackbar, setSnackbar] = useState(null);
    const [submittedData, setSubmittedData] = useState(null);
    const [openBackdrop, setOpenBackdrop] = useState(true);

    const handleCloseSnackbar = () => setSnackbar(null);

    const handleOnClose = () => {
        onClose();
    }

    const handleOnSubmit = () => {
        if (marks) {
            marks.map((item => {
                var f =  false;
                Object.entries(item).forEach(([key, value]) => {
                    if (value != null && key != 'code' && key != 'Total' && item.code) {
                        fetch('/api/examiner/setMark', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify({ session: data.exam_session, course: data.course_code, set: data.set_number, paperCode: item.code, question: key, mark: value })
                        })
                    }
                })
            }))
            fetch('/api/examiner/updateSubmitted', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ session: data.exam_session, course: data.course_code, set: data.set_number })
            })
            localStorage.removeItem(JSON.stringify(data) + 'marksheet');
            onClose({children:'Successfully submitted', serverity:'success'});
        }
    }

    useEffect(() => {
        var list = [];
        if (submittedData) {
            submittedData.map((item) => {
                const found = list.findIndex(element => element.code === item.paper_code)

                if (found != -1) list[found][item.question] = item.mark
                else {
                    const object = { code: item.paper_code, [item.question]: item.mark }
                    list.push(object)
                }
            })
        }
        setMarks(list);
    }, [submittedData])

    useEffect(() => {
        if (marks != null && editableData == true) {
            localStorage.setItem(JSON.stringify(data) + 'marksheet', JSON.stringify(marks));
        }
    }, [marks])

    setTimeout(() => {
        setOpenBackdrop(false);
        setChecked(true)
    }, 500)

    const getMarks = async() => {
        fetch('/api/examiner/getMarks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ session: data.exam_session, course: data.course_code, set: data.set_number })
        })
            .then(res => res.json())
            .then(data => setSubmittedData(data))
    }

    useEffect(() => {
        if (editableData === false) {
           getMarks();
        }
        else {
            const items = JSON.parse(localStorage.getItem(JSON.stringify(data) + 'marksheet'))
            if (items && items.length > 0)
                setMarks(items)
            else {
                getMarks();
            }
        }
    }, []);

    const ProcessRowUpdate = async (newRow, oldRow) => {
        if (marks) {
            const temp = marks.map((item) => {
                if (item.code == newRow.code) {
                    return newRow;
                }
                else return item;
            })
            setMarks(temp);
            setSnackbar({children:'saved', serverity:"success"})
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
            minWidth: 200,
            flex: 1
        },
        {
            field: "Q1",
            headerName: "Q1",
            minWidth: 70,
            flex: 1,
            editable: editableData,
            preProcessEditCellProps
        },
        {
            field: "Q2",
            headerName: "Q2",
            minWidth: 70,
            flex: 1,
            editable: editableData,
            preProcessEditCellProps
        },
        {
            field: "Q3",
            headerName: "Q3",
            minWidth: 70,
            flex: 1,
            editable: editableData,
            preProcessEditCellProps
        },
        {
            field: "Q4",
            headerName: "Q4",
            minWidth: 70,
            flex: 1,
            editable: editableData,
            preProcessEditCellProps
        },
        {
            field: "Q5",
            headerName: "Q5",
            minWidth: 70,
            flex: 1,
            editable: editableData,
            preProcessEditCellProps
        },
        {
            field: "Q6",
            headerName: "Q6",
            minWidth: 70,
            flex: 1,
            editable: editableData,
            preProcessEditCellProps
        },
        {
            field: "Q7",
            headerName: "Q7",
            minWidth: 70,
            flex: 1,
            editable: editableData,
            preProcessEditCellProps
        },
        {
            field: "Q8",
            headerName: "Q8",
            minWidth: 70,
            flex: 1,
            editable: editableData,
            preProcessEditCellProps
        },
        {
            field: "Q9",
            headerName: "Q9",
            minWidth: 70,
            flex: 1,
            editable: editableData,
            preProcessEditCellProps
        },
        {
            field: "Q10",
            headerName: "Q10",
            minWidth: 70,
            flex: 1,
            editable: editableData,
            preProcessEditCellProps
        },
        {
            field: "Total",
            headerName: "Total",
            minWidth: 70,
            flex: 1,
            valueGetter: getTotal
        },
    ]

    return (
        <Box>
            <Dialog TransitionComponent={Grow} fullWidth maxWidth='xl' open={open} sx={{ ...sx, backdropFilter: 'blur(5px)' }} PaperProps={{ sx: { minHeight: 500 } }}>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DialogTitle fontSize={25} fontWeight={'bold'}>Marksheet</DialogTitle>
                    </Box>
                    <Button size='small' sx={{ width: 30, m: 1, ml: 'auto' }} onClick={handleOnClose}><CloseIcon htmlColor='red' /></Button>
                </Box>
                <Box sx={{ ml: 3, mr: 3, mb: 3, display: 'flex', flexDirection: 'column' }}>
                    {editableData && <Button variant='contained' sx={{ ml: 'auto', mb: 2, bgcolor: '#67be23', ":hover": { bgcolor: '#67be23' } }} onClick={handleOnSubmit}>Submit</Button>}
                    {marks &&
                        <AntDesignGrid
                            sx={{ boxShadow: 3, fontSize:'16px' }}
                            getRowId={row => row.code}
                            autoHeight
                            columns={columns}
                            rows={marks}
                            checked={checked}
                            experimentalFeatures={{ newEditingApi: true }}
                            processRowUpdate={ProcessRowUpdate}
                            onProcessRowUpdateError={handleProcessRowUpdateError}
                            disableIgnoreModificationsIfProcessingProps
                        />}
                </Box>
                
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={openBackdrop}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
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

export default MarksheetDialog;