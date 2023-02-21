import ExaminerDialog from "@/component/dialog/examinerDialog";
import SumSheetDialog from "@/component/dialog/sumSheetDialog";
import TopsheetDialog from "@/component/dialog/topsheetDialog";
import Layout from "@/component/layout/layout";
import { semesterPages } from "@/constants/routes";
import Circle from "@mui/icons-material/Circle";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Paper, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const query = router.query;

  const [courseData, setCourseData] = useState([]);
  const [exmainerOpen, setExmainerOpen] = useState(false);
  const [topsheetOpen, setTopsheetOpen] = useState(false);
  const [sumSheetOpen, setSumSheetOpen] = useState(false);
  const [courseCode, setCourseCode] = useState('');

  const handleCardClick = (event) => {
    event.stopPropagation();
    setCourseCode(event.currentTarget.id);
    setExmainerOpen(true);
  }

  const handleTopsheetClick = (event) => {
    event.stopPropagation();
    setCourseCode(event.currentTarget.id);
    setTopsheetOpen(true)
  }

  const handleSumSheetClick = (event) => {
    event.stopPropagation();
    setCourseCode(event.currentTarget.id);
    setSumSheetOpen(true)
  }

  const handleOnClose = () => {
    getCourseDataList();
    setExmainerOpen(false);
  }

  const getCourseDataList = async () => {
    if (query.semester != undefined) {
      await fetch('/api/examCommittee/semester/courseDataList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(query.semester)
      })
        .then(res => res.json())
        .then(data => setCourseData(data));
    }
    if(courseData.length < 1) setCourseCode([]);
  }

  useEffect(() => {
    getCourseDataList();
  }, [query])

  return (
    <Paper elevation={3} sx={{ m: 5, bgcolor: '#e7ebf0' }}>
      <Typography fontSize={30} sx={{ pt: 3, ml: 5 }}>Courses</Typography>
      <Typography variant="caption" sx={{ml: 5 }}>Click to assign examiner*</Typography>
      <Grid
        container
        spacing={3}
        sx={{ mt:0.5, ml: 3,mr:3, pb: 3 }}
      >
        {courseData && courseData.map((item, index) => (
          <Grid key={index} accessKey={item.course_code}  minHeight={160}>
            <Card elevation={3} sx={{ minWidth: 275, ":hover": { scale: '1.04' } }}>
              <CardActionArea >
                <CardHeader
                  title={item.course_code}
                  subheader={item.course_name} />
                <CardContent>
                  
                  <Typography fontWeight='bold'>Examiners</Typography>
                  <Typography variant="body2" fontSize={14}>SET-A: {item.examiners ? item.examiners[0] : <i>None</i>}</Typography>
                  <Typography variant="body2" fontSize={14}>SET-B: {item.examiners ? item.examiners[1] : <i>None</i>}</Typography>
                  <Stack direction='row' marginTop={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                      <Circle fontSize="3px" sx={{ mr:0.3 ,color: item.assigned ? 'lightgreen' : '#bdbdbd' }} />
                      <Typography>Assigned</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                      <Circle fontSize="3px" sx={{ mr:0.3  ,color: item.submitted ? 'lightgreen' : '#bdbdbd' }} />
                      <Typography>Submitted</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Circle fontSize="3px" sx={{ mr:0.3  ,color: item.decoded ? 'lightgreen' : '#bdbdbd' }} />
                      <Typography>Decoded</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button id={item.course_code} onClick={handleCardClick}  size='small'>
                  Examiners
                </Button >

                <Button id={item.course_code} onClick={handleTopsheetClick} size='small'>
                  TopSheet
                </Button>
                
                <Button onClick={handleSumSheetClick} size='small'>
                  SummationSheet
                </Button>
                
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {exmainerOpen && <ExaminerDialog open={exmainerOpen} onClose={handleOnClose} semester={query.semester} session={query.session} course={courseCode}/>}
      {topsheetOpen && <TopsheetDialog open={topsheetOpen} onClose={() => setTopsheetOpen(false)} semester={query.semester} session={query.session} course={courseCode} /> }
      {sumSheetOpen && <SumSheetDialog open={sumSheetOpen} onClose={() => setSumSheetOpen(false)} semester={query.semester} session={query.session} course={courseCode} /> }
    </Paper>
  )
}

Dashboard.getLayout = function getLayout(page) {
  const router = useRouter();
  const query = router.query;

  return (
    <Layout pages={semesterPages} query={query}>
      <main>{page}</main>
    </Layout>
  )
}

export default Dashboard;