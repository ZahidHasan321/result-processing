import Layout from "@/component/layout/layout";
import { semesterPages } from "@/constants/routes";
import { Card, CardHeader, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const list = [
  {id: 1, name: 'zahid'},
  {id: 2, name: 'Miskat'},
  {id: 3, name: 'Shopon'},
]

const Dashboard = () => {
  const router = useRouter();
  const query = router.query;
  
  const getCourseDataList = async () => {
    console.log(query)
    await fetch('/api/examCommittee/semester/courseData/courseDataList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query.semester)
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }

  useEffect(() => {
    getCourseDataList();
  },[query.semester])
  
    return(
      <Paper elevation={3} sx={{m: 3, bgcolor:'#e7ebf0'}}>
      <Typography fontSize={30} sx={{pt:3, ml:3}}>Courses</Typography>
        <Grid
        container
        spacing={3}
        sx={{m:2,pb:3}}
      >
        {list.map((item, index) => (
          <Grid key={index}  minHeight={160} >
            <Card elevation={3} sx={{minHeight:300, minWidth:275, ":hover":{scale:'1.04'}}}>
                <CardHeader title={item.name}/>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Paper>
    )
}

Dashboard.getLayout = function getLayout(page){
    const router = useRouter();
    const query = router.query;

    return (
      <Layout pages={semesterPages} query={query}>
        <main>{page}</main>
      </Layout>
    )
  }

export default Dashboard;