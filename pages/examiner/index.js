import AntDesignGrid from "@/component/customDatagrid/customDatagrid";
import MarksheetDialog from "@/component/dialog/marksheetDialog";
import Layout from "@/component/layout/layout";
import { examinerPages } from "@/constants/routes";
import { formatOrdinals } from "@/helper/ordinal";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography  from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import { GridToolbar } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { getSession, useSession } from "next-auth/react";
import Router from "next/router";
import { useEffect, useState } from "react";
import Loading from "../loading";



const Home = () => {
  const [list, setList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [checked, setChecked] = useState(false);
  const [snackbar, setSnackbar] = useState(null);

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
      minWidth: 150,
      valueFormatter: ({ value }) => formatOrdinals(value)
    },
    {
      field: "exam_session",
      headerName: "Exam Session",
      minWidth: 150,
    },
    {
      field: "set_number",
      headerName: "Set",
      minWidth: 150,
    },
    {
      field: "assigned_date",
      headerName: "Assigned Date",
      minWidth: 250,
      valueFormatter: ({ value }) => value && dayjs(value).format('DD/MM/YYYY'),
    },
    {
      field: "enter",
      headerName: "Open",
      width: 100,
      renderCell: (params) => {
        return (
          <Button onClick={(event) => { event.preventDefault(); handleRowClick(params) }}>
            <ArrowForwardIosIcon />
          </Button>
        )
      }
    }
  ]


  return (
    <Box>
      <Paper sx={{ boxShadow: 3, minHeight: '750px' }}>
        <Typography fontSize={30} sx={{ ml: 4, pt: 3 }}>IN PROGRESS</Typography>
        <Typography variant="caption" sx={{ ml: 4 }}>Double click on row for more.</Typography>
        <Box >
          <AntDesignGrid
            sx={{ ml: 4, mr: 4, mb: 4, boxShadow: 3, fontSize: '16px' }}
            autoHeight
            onRowDoubleClick={handleRowClick}
            columns={columns}
            checked={checked}
            rows={list}
            getRowId={(row) => row.id + row.exam_session + row.course_code + row.set}
            disableColumnSelector
            disableDensitySelector
            component={{ Toolbar: GridToolbar }}
            componentsProps={{
              toolbar: {
                csvOptions: { disableToolbarButton: true },
                printOptions: { disableToolbarButton: true },
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 250 },
              },
            }}
          />
        </Box>
      </Paper>
      {openDialog && <MarksheetDialog open={openDialog} onClose={(notice) => { setOpenDialog(false); notice && setSnackbar(notice); notice && getList() }} data={rowData} editableData={true} />}
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={() => { setSnackbar(null) }}
          autoHideDuration={3000}
        >
          <Alert {...snackbar} onClose={(() => { setSnackbar(null) })} />
        </Snackbar>
      )}
    </Box>
  )
}

Home.getLayout = function getLayout({ children }) {

  const { data, status } = useSession()

  if (status === 'loading') {
    return <Loading />
  }

  if (status === 'unauthenticated') {
    Router.replace('/auth/signin')
  }

  if (status === 'authenticated' && data.user.role !== 'Teacher') {
    Router.replace('/accessDenied')
  }


  return (
    <Layout pages={examinerPages} idx={1}>
      <main>{children}</main>
    </Layout>
  )
}


export default Home;