import AntDesignGrid from "@/component/customDatagrid/customDatagrid";
import CATMdialog from "@/component/dialog/catmDialog";
import Layout from "@/component/layout/layout";
import { courseTeacher } from "@/constants/routes";
import { formatOrdinals } from "@/helper/ordinal";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Typography from "@mui/material/Typography";
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
  const [openDialog, setOpenDialog] = useState(false);
  const [list, setList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [snackbar, setSnackbar] = useState(null);
  const [clickedRow, setClickedRow] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleRowClick = (params) => {
    setClickedRow(params.row)
    setOpenDialog(true);
  }

  const getList = async () => {
    const { user } = await getSession();
    await fetch('/api/courseTeacher/getCurrentList', {
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
    getList()
  }, [])

  const columns = [
    {
      field: "course_code",
      headerName: "Course Code",
      minWidth: 200
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
      valueFormatter: ({ value }) => formatOrdinals(value)
    },
    {
      field: "exam_session",
      headerName: "Exam Session",
      minWidth: 200
    },
    {
      field: "assigned_date",
      headerName: "Assigned Date",
      minWidth: 250,
      valueFormatter: ({ value }) => value && dayjs(value).format('DD/MM/YYYY'),
    },
    {
      field: "submit_date",
      headerName: "Submit_date",
      minWidth: 250,
      valueFormatter: ({ value }) => value && dayjs(value).format('DD/MM/YYYY'),
      hide: true
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
        <Box>
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
      {openDialog && <CATMdialog open={openDialog} onClose={(snackbar) => { setSnackbar(snackbar); getList(); setOpenDialog(false) }} data={clickedRow} editableData={true} />}
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={3000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
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

  else {
    return (
      <Layout pages={courseTeacher} idx={1} >
        <main>{children}</main>
      </Layout>
    )
  }
}
export default Home;