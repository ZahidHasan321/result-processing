
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import Grow from "@mui/material/Grow"
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
        <Dialog TransitionComponent={Grow} maxWidth='xl' fullWidth open={open} onClose={handleOnClose} sx={{ backdropFilter: 'blur(5px)' }} PaperProps={{ sx: { minHeight: 500 } }} >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <DialogTitle>Suummation Sheet</DialogTitle>
            </Box>
            <Box sx={{ m: 3, flexGrow: 1 }}>
                <AntDesignGrid
                    sx={{ boxShadow: 3 }}
                    autoHeight
                    checked={checked}
                    rows={summationData}
                    columns={columns}
                    getRowId={(row) => row.roll}
                    experimentalFeatures={{ columnGrouping: true }}
                    columnGroupingModel={columnGroupingModel}
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