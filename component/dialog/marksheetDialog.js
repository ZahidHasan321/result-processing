import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Button, Dialog, DialogTitle, Grow, Snackbar, Tooltip, tooltipClasses } from "@mui/material";
import { GridEditInputCell } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import AntDesignGrid from "../customDatagrid/customDatagrid";



const MarksheetDialog = (props) => {
    const { open, onClose, data } = props;
    const [paperCodes, setPaperCodes] = useState([]);
    const [marks, setMarks] = useState(null);
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState(null);

    const handleCloseSnackbar = () => setSnackbar(null);

    const handleOnClose = () => {
        onClose();
    }

    const getMarsheetData = async () => {
        await fetch('/api/examiner/getPaperCodes', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ session: data.exam_session, course: data.course_code, set: data.set_number })
        })
            .then(res => res.json())
            .then(data => {
                setPaperCodes(data);
            });

    }

    useEffect(() => {
        const list = paperCodes.map((mark) => {
            return mark = { ...mark, Q1: null, Q2: null, Q3: null, Q4: null, Q5: null, Q6: null, Q7: null, Q8: null, Q9: null, Q10: null }
        })
        setMarks(list);
        setLoading(false);
    }, [paperCodes])

    useEffect(() => {
        if (marks != null) {
            localStorage.setItem(JSON.stringify(data), JSON.stringify(marks));
            setChecked(true);
        }
    }, [marks])


    useEffect(() => {
        const items = JSON.parse(localStorage.getItem(JSON.stringify(data)))
        console.log(items);
        if (!items)
            getMarsheetData();
        else {
            setMarks(items);
        }
    }, []);

    if (loading) return <h1></h1>

    const ProcessRowUpdate = async (newRow, oldRow) => {

        if (marks) {
            const temp = marks.map((item) => {
                if (item.code == newRow.code) {
                    return newRow;
                }
                else return item;
            })
            setMarks(temp);
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
        if((params.row.Q1)||(params.row.Q2)||(params.row.Q3)||(params.row.Q4)||(params.row.Q5)||(params.row.Q6)||(params.row.Q7)||(params.row.Q8)||(params.row.Q9)||(params.row.Q10)){
            return (+params.row.Q1)+(+params.row.Q2)+(+params.row.Q3)+(+params.row.Q4)+(+params.row.Q5)+(+params.row.Q6)+(+params.row.Q7)+(+params.row.Q8)+(+params.row.Q9)+(+params.row.Q10);
        }
        else{
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
            editable: true,
            preProcessEditCellProps
        },
        {
            field: "Q2",
            headerName: "Q2",
            minWidth: 70,
            flex: 1,
            editable: true,
            preProcessEditCellProps
        },
        {
            field: "Q3",
            headerName: "Q3",
            minWidth: 70,
            flex: 1,
            editable: true,
            preProcessEditCellProps
        },
        {
            field: "Q4",
            headerName: "Q4",
            minWidth: 70,
            flex: 1,
            editable: true,
            preProcessEditCellProps
        },
        {
            field: "Q5",
            headerName: "Q5",
            minWidth: 70,
            flex: 1,
            editable: true,
            preProcessEditCellProps
        },
        {
            field: "Q6",
            headerName: "Q6",
            minWidth: 70,
            flex: 1,
            editable: true,
            preProcessEditCellProps
        },
        {
            field: "Q7",
            headerName: "Q7",
            minWidth: 70,
            flex: 1,
            editable: true,
            preProcessEditCellProps
        },
        {
            field: "Q8",
            headerName: "Q8",
            minWidth: 70,
            flex: 1,
            editable: true,
            preProcessEditCellProps
        },
        {
            field: "Q9",
            headerName: "Q9",
            minWidth: 70,
            flex: 1,
            editable: true,
            preProcessEditCellProps
        },
        {
            field: "Q10",
            headerName: "Q10",
            minWidth: 70,
            flex: 1,
            editable: true,
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
            <Dialog TransitionComponent={Grow} fullWidth maxWidth='xl' open={open} sx={{ backdropFilter: 'blur(5px)' }}>
                <Box sx={{ display: 'flex' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DialogTitle fontSize={25} fontWeight={'bold'}>Marksheet</DialogTitle>
                    </Box>
                    <Button size='small' sx={{ width: 30, m: 1, ml: 'auto' }} onClick={handleOnClose}><CloseIcon htmlColor='red' /></Button>
                </Box>
                <Box sx={{ ml: 3, mr: 3, mb: 3, display: 'flex', flexDirection: 'column' }}>
                    <Button variant='contained' sx={{ ml: 'auto', mb: 2 }}>Submit</Button>
                    {marks &&
                        <AntDesignGrid
                            sx={{ boxShadow: 3 }}
                            getRowId={row => row.code}
                            autoHeight
                            columns={columns}
                            rows={marks}
                            checked={checked}
                            experimentalFeatures={{ newEditingApi: true }}
                            processRowUpdate={ProcessRowUpdate}
                            onProcessRowUpdateError={handleProcessRowUpdateError}
                        />}
                </Box>
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