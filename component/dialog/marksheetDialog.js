import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogTitle, Grow } from "@mui/material";
import { useEffect, useState } from "react";
import AntDesignGrid from "../customDatagrid/customDatagrid";

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
        minWidth: 200,
        flex: 1,
        editable: true,
    },
    {
        field: "Q2",
        headerName: "Q2",
        minWidth: 200,
        flex: 1,
        editable: true,
    },
    {
        field: "Q3",
        headerName: "Q3",
        minWidth: 200,
        flex: 1,
        editable: true,
    },
    {
        field: "Q4",
        headerName: "Q4",
        minWidth: 200,
        flex: 1,
        editable: true,
    },

]

const MarksheetDialog = (props) => {
    const { open, onClose, data } = props;
    const [paperCodes, setPaperCodes] = useState([]);
    const [marks, setMarks] = useState(null);
    const [checked, setChecked] = useState(false);
    const [loading, setLoading ] = useState(true);

    const handleOnClose = () => {
        onClose();
    }

    const getMarsheetData = async () => {
        await fetch('/api/examiner/getMarksheetData', {
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
            return mark = { ...mark, Q1: '', Q2: '', Q3: '', Q4: '' }
        })
        setMarks(list);
        setLoading(false);
    }, [paperCodes])

    useEffect(() => {
        if (marks != null)
            setChecked(true);
    }, [marks])

    
    useEffect(() => {
        getMarsheetData();
        
    }, []);

    if(loading) return <h1></h1>

    return (
        <Box height={700}>
            <Dialog TransitionComponent={Grow} fullWidth maxWidth='xl' open={open} sx={{ backdropFilter: 'blur(5px)' }}>
                <Button sx={{width:30, m:1, ml:'auto' }} onClick={handleOnClose}><CloseIcon htmlColor='red'/></Button>
                <Box sx={{ display: 'flex', justifyContent:'center', alignItems:'center'}}>
                    <DialogTitle fontSize={25} fontWeight={'bold'}>Marksheet</DialogTitle>
                </Box>

                {marks &&
                    <AntDesignGrid
                        getRowId={row => row.code}
                        autoHeight
                        columns={columns}
                        rows={marks}
                        checked={checked}
                        experimentalFeatures={{ newEditingApi: true }}
                    />}
            </Dialog>

        </Box>
    )

}

export default MarksheetDialog;