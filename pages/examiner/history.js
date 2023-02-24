import Layout from "@/component/layout/layout";
import { examinerPages } from "@/constants/routes";
import { Box, Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";


const History = () => {
  const [list, setList] = useState([]);

  const getList = async () => {
    const { user } = await getSession();

    fetch('/api/examiner/getHistory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user.id)
    })
      .then(res => res.json())
      .then(data => setList(data))
  }

  useEffect(() => {
    getList();
  }, [])

  const columns = [
    {
      field: "course_code",
      headerName: "Course Code",
      minWidth: 200,
      flex: 1
    },
    {
      field: "course_name",
      headerName: "Course Name",
      minWidth: 200,
      flex: 1
    },
    
    {
      field: "semester",
      headerName: "Semester",
      minWidth: 200,
      flex: 1
    },
    {
      field: "exam_session",
      headerName: "Exam Session",
      minWidth: 200,
      flex: 1
    },
    {
      field: "set_number",
      headerName: "Set",
      minWidth: 200,
      flex: 1
    },
    {
      field: "enter",
      headerName: "Enter",
      width: 90,
      renderCell: (params) => {
        return (
          <Button sx={{ bgcolor: 'lightgreen', ":hover": { bgcolor: 'lightgreen' } }} onClick={(event) => { event.preventDefault(); handleRowClick(params) }}>
            <NavigateNextIcon />
          </Button>
        )
      }
    }
  ]
  return (
    <Box>
      <Paper>
       {list &&  <DataGrid 
        columns={columns}
        rows={list}
        getRowId={(row) => row.id+row.exam_session+row.course_code+row.set}
        autoHeight
        />}
      </Paper>
    </Box>
  )
}

History.getLayout = function getLayout(page) {
  return (
    <Layout pages={examinerPages}>
      <main>{page}</main>
    </Layout>
  )
}


export default History;