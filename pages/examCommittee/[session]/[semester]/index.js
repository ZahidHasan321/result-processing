import ExaminerDialog from "@/component/dialog/examinerDialog";
import Layout from "@/component/layout/layout";
import { semesterPages } from "@/constants/routes";
import Circle from "@mui/icons-material/Circle";
import { Box, Card, CardActionArea, CardContent, CardHeader, Paper, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const query = router.query;

  const [courseData, setCourseData] = useState([]);
  const [open, setOpen] = useState(false);

  const handleCardClick = () => {
    setOpen(true);
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
          <Grid key={index} minHeight={160} >
            <Card elevation={3} sx={{ minWidth: 275, ":hover": { scale: '1.04' } }}>
              <CardActionArea onClick={handleCardClick}>
                <CardHeader
                  title={item.course_code}
                  subheader={item.course_name} />

                <CardContent>
                  <Typography fontWeight='bold'>Examiners</Typography>
                  <Typography fontSize={14}>SET-A: {item.examiners[0]}</Typography>
                  <Typography fontSize={14}>SET-B: {item.examiners[1]}</Typography>
                  <Stack direction='row' marginTop={3}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                      <Circle fontSize="3px" sx={{mb:0.2, mr:0.3 ,color: item.assigned ? 'lightgreen' : '#bdbdbd' }} />
                      <Typography>Assigned</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                      <Circle fontSize="3px" sx={{ mb:0.2, mr:0.3  ,color: item.submitted ? 'lightgreen' : '#bdbdbd' }} />
                      <Typography>Submitted</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Circle fontSize="3px" sx={{ mb:0.2, mr:0.3  ,color: item.decoded ? 'lightgreen' : '#bdbdbd' }} />
                      <Typography>Decoded</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ExaminerDialog open={open} onClose={() => setOpen(false)}/>
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