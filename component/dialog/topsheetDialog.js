import { formatOrdinals } from "@/helper/ordinal";
import { Box, Dialog, DialogTitle, Grow, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import TabPanel from "../tab/tabPanel";
import Topsheet from "../topsheet/topsheet";


const TopsheetDialog = (props) => {
    const { open, onClose, semester, session, course } = props;
    const [tab, setTab] = useState(0);

    const handleOnClose = () => {
        onClose();
    }




    return (
        <Dialog TransitionComponent={Grow} maxWidth='xl' fullWidth open={open} onClose={handleOnClose} sx={{ backdropFilter: 'blur(5px)' }}>
            <Box sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <DialogTitle fontSize={30} fontWeight='bold'>Top Sheet</DialogTitle>
                <Stack direction={'row'} spacing={3} sx={{mb:2}}>
                <Typography fontWeight={'bold'} fontSize={18}> Session:{session}</Typography>
                <Typography fontWeight={'bold'} fontSize={18}>Semester:{formatOrdinals(semester)}</Typography>    
                <Typography fontWeight={'bold'} fontSize={18}>Course:{course}</Typography>
                </Stack>
                <Tabs
                    sx={{ width:500, borderBottom:1}}
                    variant="fullWidth"
                    value={tab}
                    onChange={(event, value) => setTab(value)}
                    textColor="secondary"
                    indicatorColor="secondary"
                >
                    <Tab value={0} label="Set A" />
                    <Tab value={1} label="Set B" />
                </Tabs>
                <Box border={1} boxShadow={2} marginBottom={2}>
                <TabPanel value={tab} index={0}>
                    <Topsheet set="A" course={course} semester={semester} session={session} />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <Topsheet set="B" course={course} semester={semester} session={session} />
                </TabPanel>
                </Box>

            </Box>
        </Dialog>
    )
}

export default TopsheetDialog;