import ExaminerDialog from "@/component/dialog/examinerDialog";
import SumSheetDialog from "@/component/dialog/sumSheetDialog";
import TopsheetDialog from "@/component/dialog/topsheetDialog";
import Layout from "@/component/layout/layout";
import { semesterPages } from "@/constants/routes";
import { formatOrdinals } from "@/helper/ordinal";
import Circle from "@mui/icons-material/Circle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const Dashboard = () => {
  const router = useRouter();
  const query = router.query;

  const [courseData, setCourseData] = useState([]);
  const [exmainerOpen, setExmainerOpen] = useState(false);
  const [topsheetOpen, setTopsheetOpen] = useState(false);
  const [sumSheetOpen, setSumSheetOpen] = useState(false);
  const [courseCode, setCourseCode] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [checked, setChecked] = useState(false);
  const [snackbar, setSnackbar] = useState(null);

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
    }
  }

  const getDates = async () => {
    await fetch('/api/examCommittee/semester/getExamInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ semester: query.semester, session: query.session })
    })
      .then(res => res.json())
      .then(data => {
        setStartDate(data[0] != null? dayjs(data[0].start_date) : null)
        setEndDate(data[0] != null ? dayjs(data[0].end_date) : null)
        setChecked(true);
      })
  }

  useEffect(() => {
    if (query.semester != undefined && query.session != undefined) {
      getCourseDataList();
      getDates();
    }
  }, [query.semester, query.session])


  const startDateset = async (value) => {
    await fetch('/api/examCommittee/semester/setStartDate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ semester: query.semester, session: query.session, startDate: dayjs(value).format('YYYY-MM-DD') })
    })
    .then(() => setSnackbar({children:'Start Date Updated', severity:'success'}))
  }

  const endDateset = async (value) => {
    await fetch('/api/examCommittee/semester/setEndDate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ semester: query.semester, session: query.session, endDate: dayjs(value).format('YYYY-MM-DD') })
    })
    .then(() => setSnackbar({children:'End Date Updated', severity:'success'}))
  }

  return (
    <>
      <Paper elevation={3} sx={{ bgcolor: '#e7ebf0' }}>
        <Box sx={{ display: 'flex', ml: 3, pt: 3 }}>
          <Typography fontSize={30} sx={{ mr: 'auto' }}> {formatOrdinals(query.semester)} Semester, {query.session}</Typography>
          <Box sx={{ pr: 3, display: 'flex', alignItems:'baseline' }}>
            <DatePicker value={startDate} onChange={value => { setStartDate(value), startDateset(value) }}
              label="Start Date"
              sx={{ mr: 3 }}
              format="DD-MM-YYYY"
              slotProps={{
                textField: {
                  helperText: "DD-MM-YYYY"
                },
              }}
              />

            <DatePicker value={endDate} onChange={value => { setEndDate(value), endDateset(value) }}
              label="End Date"
              sx={{ mr: 3 }}
              format="DD-MM-YYYY"
              slotProps={{
                textField: {
                  helperText: "DD-MM-YYYY"
                },
                
              }}
              />
            <Link href={`/examCommittee/${query.session}/${query.semester}/tabulationPDF`}><Button variant="contained">Tabulation PDF</Button></Link>
            <Link href={`/examCommittee/${query.session}/${query.semester}/gradesheetPDF`}><Button variant="contained">Gradesheet PDF</Button></Link>
          </Box>
        </Box>
        <Slide in={checked}>
          <Grid
            container
            spacing={3}
            sx={{ mt: 0.5, ml: 1, mr: 1, pb: 3 }}
          >
            {courseData && courseData.map((item, index) => {
              return (
                <Grid key={index} accessKey={item.course_code} minHeight={160}>
                  <Card elevation={3} sx={{ minWidth: 275, ":hover": { scale: '1.04' } }}>
                    <CardActionArea >
                      <CardHeader
                        title={item.course_code}
                        subheader={item.course_name} />

                      <CardContent>
                        <Typography variant="body2" fontSize={14}>SET-A: {item.examiner_a_name ? item.examiner_a_name : <i>None</i>}</Typography>
                        <Typography variant="body2" fontSize={14}>SET-B: {item.examiner_b_name ? item.examiner_b_name : <i>None</i>}</Typography>

                        <Stack direction={'row'} sx={{ mt: 1 }}>
                          <Typography variant="body2" sx={{ mr: 1 }} fontSize={14}>SUBMITTED: </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                            <Circle fontSize="3px" sx={{ mr: 0.2, color: item.submitted_a ? 'lightgreen' : '#bdbdbd' }} />
                            <Typography fontSize={14}>SET-A</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', }}>
                            <Circle fontSize="3px" sx={{ mr: 0.2, color: item.submitted_b ? 'lightgreen' : '#bdbdbd' }} />
                            <Typography fontSize={14}>SET-B</Typography>
                          </Box>
                        </Stack>

                        <Stack direction={'row'}>
                          <Typography variant="body2" sx={{ mr: 2.5 }} fontSize={14}>DECODED: </Typography>
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

                        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2, mt: 1 }}>
                          <Circle fontSize="3px" sx={{ mr: 0.2, color: item.catm ? 'lightgreen' : '#bdbdbd' }} />
                          <Typography variant="body2" fontSize={14}>CATM</Typography>
                        </Box>
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
              )
            })}
          </Grid>
        </Slide>

        {exmainerOpen && <ExaminerDialog open={exmainerOpen} onClose={handleOnClose} semester={query.semester} session={query.session} course={courseCode} />}
        {topsheetOpen && <TopsheetDialog open={topsheetOpen} onClose={() => { getCourseDataList(); setTopsheetOpen(false) }} semester={query.semester} session={query.session} course={courseCode} />}
        {sumSheetOpen && <SumSheetDialog open={sumSheetOpen} onClose={() => setSumSheetOpen(false)} semester={query.semester} session={query.session} course={courseCode} />}
      </Paper>

      {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={() => setSnackbar(null)}
                    autoHideDuration={3000}
                >
                    <Alert {...snackbar} onClose={() => setSnackbar(null)} />
                </Snackbar>
            )}
    </>
  )
}

const HeaderLayout = ({ children }) => {
  const router = useRouter();
  const query = router.query;

  return (
    <>
      <Layout pages={semesterPages} query={query}>
        {children}
      </Layout>
    </>
  );
};

Dashboard.getLayout = function getLayout(page) {


  return (
    <HeaderLayout>
      <main>{page}</main>
    </HeaderLayout>
  )
}

export default Dashboard;