import { Dialog, DialogTitle, Grow, Tab, Tabs } from "@mui/material";
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
            <DialogTitle fontSize={30} fontWeight='bold'>Top Sheet</DialogTitle>
            <Tabs
                value={tab}
                onChange={(event, value) => setTab(value)}
                textColor="secondary"
                indicatorColor="secondary"
            >
                <Tab value={0} label="Set A" />
                <Tab value={1} label="Set B" />
            </Tabs>

            <TabPanel value={tab} index={0}>
                <Topsheet set="A" course={course} semester={semester} session={session}/>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <Topsheet set="B" course={course} semester={semester} session={session}/>
            </TabPanel>


        </Dialog>
    )
}

export default TopsheetDialog;