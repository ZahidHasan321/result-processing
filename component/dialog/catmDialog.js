
import { Typography } from "@mui/material"
import Alert from "@mui/material/Alert"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Dialog from "@mui/material/Dialog"
import Grow from "@mui/material/Grow"
import Snackbar from "@mui/material/Snackbar"
import { useCallback, useEffect, useState } from "react"
import AntDesignGrid from "../customDatagrid/customDatagrid"
import PublishIcon from '@mui/icons-material/Publish';
import { GridToolbar } from "@mui/x-data-grid"

const CATMdialog = (props) => {
    const { open, onClose, data, editableData, sx } = props;
    const [marks, setMarks] = useState([]);
    const [snackbar, setSnackbar] = useState(null);
    const [checked, setChecked] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(true);


    const getTotal = (params) => {
        if (params.row.ct || params.row.attendance) {
            return (+(params.row.ct ? params.row.ct : null)) + (+(params.row.attendance ? params.row.attendance : null))
        }
        return null;
    }

    const handleOnSubmit = async () => {

        await fetch('/api/courseTeacher/setMarks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ marks, session: data.exam_session, course: data.course_code })
        })
            .then(res => res.json())
            .then(data => {
                localStorage.removeItem(JSON.stringify(data) + 'catm')
                onClose(data);
            })
    }

    const handleCloseSnackbar = () => setSnackbar(null);

    const preProcessEditCellProps = (params) => {
        const hasError = isNaN(params.props.value)
        if (hasError) setSnackbar({ children: "Not A Number", serverity: 'error' })

        return { ...params.props, error: hasError };
    }

    const handleProcessRowUpdateError = useCallback((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);

    const updateMarks = (newRow) => {
        const temp = marks.map((item) => {
            if (item.roll === newRow.roll) {
                return newRow
            }
            else return item
        })
        setMarks(temp);
    }

    const ProcessRowUpdate = (newRow, oldRow) => {
        if (JSON.stringify(oldRow) === JSON.stringify(newRow)) return oldRow;

        if (newRow.ct > 13.5 || newRow.attendance > 7.5) {
            setSnackbar({ children: "Out of Range number", serverity: 'error' })
            return oldRow;
        }
        updateMarks(newRow);
        setSnackbar({ children: 'saved', serverity: "success" })
        return newRow;
    }

    const columns = [
        {
            field: "no",
            headerName: "No",
            minWidth: 100,
            flex: 1,
            filterable: false,
            renderCell: (index) => index.api.getRowIndex(index.row.roll) + 1,
            flex: 1
        },
        {
            field: "roll",
            headerName: "Roll No",
            minWidth: 100,
            flex: 1
        },
        {
            field: "name",
            headerName: "Student Name",
            minWidth: 200,
            flex: 1
        },
        {
            field: "ct",
            headerName: "ClassTest(13.5)",
            minWidth: 120,
            flex: 1,
            editable: editableData,
            preProcessEditCellProps
        },
        {
            field: "attendance",
            headerName: "Attendace(7.5)",
            minWidth: 120,
            flex: 1,
            editable: editableData,
            preProcessEditCellProps
        },
        {
            field: "total",
            headerName: "Total(21)",
            minWidth: 120,
            flex: 1,
            valueGetter: getTotal
        }
    ]

    const getMarks = async () => {
        await fetch('/api/courseTeacher/getMarks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session: data.exam_session, course: data.course_code })
        })
            .then(res => res.json())
            .then(data => {
                const list = data.map(((item, idx) => {
                    return { no: idx + 1, ...item }
                }))

                setMarks(list);
            });
    }

    const getStudentID = async () => {
        await fetch('/api/courseTeacher/getstudents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session: data.exam_session, semester: data.semester })
        })
            .then(res => res.json())
            .then(data => {
                const rolls = data.map((item) => {
                    return { roll: item.roll, name: item.name, ct: null, attendance: null }
                })

                setMarks(rolls)
            })
    }

    useEffect(() => {
        if (!editableData) {
            getMarks()
            return;
        }

        const item = JSON.parse(localStorage.getItem(JSON.stringify(data) + 'catm'))

        if (item && item.length > 0) {
            if (item[0].roll != null)
                setMarks(item);
        }
        else if (marks.length < 1) {
            getStudentID();
        }
    }, [])


    useEffect(() => {
        if (editableData == true && marks.length > 0 && marks[0].roll != null && editableData) {
            localStorage.setItem(JSON.stringify(data) + 'catm', JSON.stringify(marks));
        }
    }, [marks])

    setTimeout(() => {
        setOpenBackdrop(false);
        setChecked(true)
    }, 500)


    return (
        <Dialog TransitionComponent={Grow} fullWidth maxWidth='lg' open={open} onClose={() => onClose()} sx={{ ...sx, backdropFilter: 'blur(5px)' }} PaperProps={{ sx: { minHeight: 750 } }}>
            <Typography fontWeight={'bold'} textAlign={'center'} fontSize={30} mt={3}>Class Attendance & Test Marks</Typography>
            <Typography textAlign={'center'} fontSize={20}>Course Name: {data.course_name}</Typography>
            <Typography textAlign={'center'} fontSize={20}>Course Code: {data.course_code}</Typography>
            <Typography textAlign={'center'} fontSize={20}> Session: {data.exam_session} </Typography>
            <Box sx={{ ml: 5, mr: 5, mb: 3, display: 'flex', flexDirection: 'column', mt: 2}}>
                {editableData && <Button variant='contained' sx={{ ml: 'auto', mb: 2, bgcolor: '#67be23', ":hover": { bgcolor: '#67be23' } }} onClick={handleOnSubmit}>Submit <PublishIcon /></Button>}
                <AntDesignGrid
                    sx={{ boxShadow: 3, fontSize: '16px' }}
                    getRowId={row => row.roll}
                    autoHeight
                    columns={columns}
                    rows={marks}
                    checked={checked}
                    experimentalFeatures={{ newEditingApi: true }}
                    processRowUpdate={ProcessRowUpdate}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    disableIgnoreModificationsIfProcessingProps
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
                />
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
    )

}

export default CATMdialog;