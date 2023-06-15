import { formatOrdinals } from "@/helper/ordinal";
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import Tabs from "@mui/material/Tabs"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import Stack from "@mui/material/Stack"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import Grow from "@mui/material/Grow"
import Typography from "@mui/material/Typography";
import { useState } from "react";
import TabPanel from "../tab/tabPanel";
import Topsheet from "../topsheet/topsheet";


const TopsheetDialog = (props) => {
    const { open, onClose, semester, session, course } = props;
    const [tab, setTab] = useState(0);
    const [checked, setChecked] = useState(false);
    const [openBackdrop, setOpenBackdrop] = useState(true);

    const handleOnClose = () => {
        onClose();
    }

    setTimeout(() => {
        setOpenBackdrop(false);
        setChecked(true)
    }, 500)

    return (
        <Dialog TransitionComponent={Grow} maxWidth='xl' fullWidth open={open} onClose={handleOnClose} sx={{ backdropFilter: 'blur(5px)' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <DialogTitle fontSize={30} fontWeight='bold'>Top Sheet</DialogTitle>
                <Stack direction={'column'} spacing={1} sx={{ mb: 2 }}>
                    <Typography fontSize={18}><b>{formatOrdinals(semester)} semester</b> Bsc Engineering <b>{session}</b></Typography>
                    <Typography fontWeight={'bold'} fontSize={22} alignSelf={'center'}>{course}</Typography>
                </Stack>
                <Tabs
                    sx={{ width: 500, borderBottom: 1 }}
                    variant="fullWidth"
                    value={tab}
                    onChange={(event, value) => setTab(value)}
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab value={0} label="Set A" />
                    <Tab value={1} label="Set B" />
                </Tabs>

                    <Box borderTop={1} boxShadow={2} marginBottom={2} sx={{bgcolor: '#e7ebf0'}}>
                        <TabPanel value={tab} index={0}>
                            <Topsheet set="A" course={course} semester={semester} session={session} />
                        </TabPanel>
                        <TabPanel value={tab} index={1}>
                            <Topsheet set="B" course={course} semester={semester} session={session} />
                        </TabPanel>
                    </Box>
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

export default TopsheetDialog;