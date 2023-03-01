import ExaminerDialog from "@/component/dialog/examinerDialog";
import SumSheetDialog from "@/component/dialog/sumSheetDialog";
import TopsheetDialog from "@/component/dialog/topsheetDialog";
import Layout from "@/component/layout/layout";
import { semesterPages } from "@/constants/routes";
import { formatOrdinals } from "@/helper/ordinal";
import Circle from "@mui/icons-material/Circle";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Slide from "@mui/material/Slide"

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
  const [checked, setChecked] = useState(false);

  const handleExaminerClick = (event) => {
    setCourseCode(event.target.id);
    setExmainerOpen(true);
  }

  const handleTopsheetClick = (event) => {
    setCourseCode(event.target.id);
    setTopsheetOpen(true)
  }

  const handleSumSheetClick = (event) => {
    setCourseCode(event.target.id);
    setSumSheetOpen(true)
  }

  const handleOnClose = () => {
    getCourseDataList();
    setExmainerOpen(false);
  }

  const getCourseDataList = async () => {
    if (query.semester != undefined && query.session != undefined) {
      await fetch('/api/examCommittee/semester/courseDataList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ semester: query.semester, session: query.session })
      })
        .then(res => res.json())
        .then(data => {
          setCourseData(data)
          
        });

        setChecked(true);
    }
  }

  useEffect(() => {
    getCourseDataList();
  }, [query])

  return (
    <Paper elevation={3} sx={{ m: 4, bgcolor: '#e7ebf0' }}>

      {checked && <Typography fontSize={30} sx={{ ml: 3, pt: 3 }}> {formatOrdinals(query.semester)} Semester, {query.session}</Typography>}
      <Slide in={checked}>
        <Grid
          container
          spacing={3}
          sx={{ mt: 0.5, ml: 1, mr: 1, pb: 3 }}
        >
          {courseData && courseData.map((item, index) => (
            <Grid key={index} accessKey={item.course_code} minHeight={160}>
              <Card elevation={3} sx={{ minWidth: 275, ":hover": { scale: '1.04' } }}>
                <CardActionArea >
                  <CardHeader
                    title={item.course_code}
                    subheader={item.course_name} />

                  <CardContent>
                    <Typography variant="body2" fontSize={14}>SET-A: {item.examiner_a_name ? item.examiner_a_name  : <i>None</i>}</Typography>
                    <Typography variant="body2" fontSize={14}>SET-B: {item.examiner_b_name  ? item.examiner_b_name  : <i>None</i>}</Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2, mt:1}}>
                      <Circle fontSize="3px" sx={{ mr: 0.2, color: item.catm ? 'lightgreen' : '#bdbdbd' }} />
                      <Typography variant="body2" fontSize={13}>CATM</Typography>
                    </Box>

                    <Stack direction={'row'}>
                      <Typography variant="body2" sx={{ mr: 1 }} fontSize={14}>SUBMITTED: </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        <Circle fontSize="3px" sx={{ mr: 0.2, color: item.submitted_a? 'lightgreen' : '#bdbdbd' }} />
                        <Typography fontSize={14}>SET-A</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', }}>
                        <Circle fontSize="3px" sx={{ mr: 0.2, color: item.submitted_b ? 'lightgreen' : '#bdbdbd' }} />
                        <Typography fontSize={14}>SET-B</Typography>
                      </Box>
                    </Stack>

                    <Stack direction={'row'}>
                    <Typography variant="body2"  sx={{mr:2.5}} fontSize={14}>DECODED: </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                      <Circle fontSize="3px" sx={{ mr: 0.2, color: item.decoded_a ? 'lightgreen' : '#bdbdbd' }} />
                      <Typography fontSize={14}>SET-A</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                      <Circle fontSize="3px" sx={{ mr: 0.2, color: item.decoded_b ? 'lightgreen' : '#bdbdbd' }} />
                      <Typography fontSize={14}>SET-B</Typography>
                    </Box>
                  </Stack>

                    <Stack direction={'row'}>
                      <Typography variant="body2" sx={{ mr: 2 }} fontSize={14}>TOPSHEET: </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                        <Circle fontSize="3px" sx={{ mr: 0.2, color: item.set_a ? 'lightgreen' : '#bdbdbd' }} />
                        <Typography fontSize={14}>SET-A</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', }}>
                        <Circle fontSize="3px" sx={{ mr: 0.2, color: item.set_b ? 'lightgreen' : '#bdbdbd' }} />
                        <Typography fontSize={14}>SET-B</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button id={item.course_code} onClick={handleExaminerClick} size='small' color='secondary'>
                    Examiners
                  </Button >

                  <Button id={item.course_code} onClick={handleTopsheetClick} size='small' color='secondary'>
                    TopSheet
                  </Button>

                  <Button id={item.course_code} onClick={handleSumSheetClick} size='small' color='secondary'>
                    SummationSheet
                  </Button>

                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Slide>
      {exmainerOpen && <ExaminerDialog open={exmainerOpen} onClose={handleOnClose} semester={query.semester} session={query.session} course={courseCode} />}
      {topsheetOpen && <TopsheetDialog open={topsheetOpen} onClose={() => { getCourseDataList(); setTopsheetOpen(false) }} semester={query.semester} session={query.session} course={courseCode} />}
      {sumSheetOpen && <SumSheetDialog open={sumSheetOpen} onClose={() => setSumSheetOpen(false)} semester={query.semester} session={query.session} course={courseCode} />}
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