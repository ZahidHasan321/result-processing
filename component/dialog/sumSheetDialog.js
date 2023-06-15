
import CloseIcon from '@mui/icons-material/Close'
import { Button, Typography } from "@mui/material"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import Dialog from "@mui/material/Dialog"
import Grow from "@mui/material/Grow"
import { GridToolbar } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import AntDesignGrid from "../customDatagrid/customDatagrid"

const columns = [
    {
        field: "roll",
        headerName: "StudentID",
        minWidth: 200,
        flex: 1
    },
    {
        field: "name",
        headerName: "Student Name",
        minWidth: 200,
        flex: 1
    },
    {
        field: "catm",
        headerName: "CATM marks",
        minWidth: 100,
        flex: 1
    },
    {
        field: "code_a",
        headerName: "Code",
        minWidth: 200,
        flex: 1
    },
    {
        field: "mark_a",
        headerName: "Marks",
        minWidth: 100,
        flex: 1
    },
    {
        field: "code_b",
        headerName: "Code",
        minWidth: 200,
        flex: 1
    },
    {
        field: "mark_b",
        headerName: "Marks",
        minWidth: 100,
        flex: 1
    },
    {
        field: "total",
        headerName: "Marks Obtained",
        minWidth: 200,
        flex: 1
    },
];

const columnGroupingModel = [
    {
        groupId: '1st Examiner',
        headerAlign: 'center',
        children: [{ field: 'code_a' }, { field: 'mark_a' }],
    },
    {
        groupId: '2st Examiner',
        headerAlign: 'center',
        children: [{ field: 'code_b' }, { field: 'mark_b' }],
    }
];


const SumSheetDialog = (props) => {
    const { open, onClose, semester, session, course } = props;

    const [summationData, setSummationData] = useState([]);
    const [checked, setChecked] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(true);

    const getList = () => {
        fetch('/api/examCommittee/semester/getSummationList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session, course })
        })
            .then(res => res.json())
            .then(data => {
                setSummationData(data)
            });
    }
    useEffect(() => {
        getList();
    }, [])

    setTimeout(() => {
        setOpenBackdrop(false);
        setChecked(true)
    }, 500)

    const handleOnClose = () => {
        onClose();
    }
    return (
        <Dialog TransitionComponent={Grow} maxWidth='xl' fullWidth open={open} onClose={handleOnClose} sx={{ backdropFilter: 'blur(5px)' }} PaperProps={{ sx: { minHeight: 750 } }} >
            <Button size='small' sx={{ width: 30, m: 1, ml: 'auto' }} onClick={handleOnClose}><CloseIcon htmlColor='red' /></Button>

            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <Typography fontWeight={'bold'} textAlign={'center'} fontSize={30} >Summation Sheet</Typography>
                <Typography textAlign={'center'} fontSize={20}>Course Code: {course}</Typography>
                <Typography textAlign={'center'} fontSize={20}> Session: {session} </Typography>
            </Box>
            <Box sx={{ m: 3, flexGrow: 1, mt: 2}}>
                <AntDesignGrid
                    sx={{ boxShadow: 3, fontSize: '16px' }}
                    autoHeight
                    checked={checked}
                    rows={summationData}
                    columns={columns}
                    getRowId={(row) => row.roll}
                    experimentalFeatures={{ columnGrouping: true }}
                    columnGroupingModel={columnGroupingModel}
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

        </Dialog>
    )
}

export default SumSheetDialog;