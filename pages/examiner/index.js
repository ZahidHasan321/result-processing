import AntDesignGrid from "@/component/customDatagrid/customDatagrid";
import MarksheetDialog from "@/component/dialog/marksheetDialog";
import Layout from "@/component/layout/layout";
import { examinerPages } from "@/constants/routes";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Button, Paper } from "@mui/material";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";



const Home = () => {
  const [list, setList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [checked, setChecked] = useState(false);

  const getList = async () => {
    const { user } = await getSession();

    await fetch('/api/examiner/getCurrentList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user.id)
    })
      .then(res => res.json())
      .then(data => setList(data))
    setChecked(true);
  }


  useEffect(() => {
    getList();
  }, [])

  const handleRowClick = (params) => {
    setRowData(params.row)
    setOpenDialog(true);
  }

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
      width: 100,

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
      <Paper sx={{ boxShadow: 3, m: 6, minWidth: 700 }}>
        <Box sx={{ m: 3, pt: 3, pb:3 }}>
          <AntDesignGrid
            sx={{ boxShadow: 3 }}
            autoHeight
            columns={columns}
            checked={checked}
            rows={list}

            getRowId={(row) => row.id + row.exam_session + row.course_code + row.set}
          />
        </Box>
      </Paper>
      {openDialog && <MarksheetDialog open={openDialog} onClose={() => setOpenDialog(false)} data={rowData} />}
    </Box>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout pages={examinerPages}>
      <main>{page}</main>
    </Layout>
  )
}


export default Home;