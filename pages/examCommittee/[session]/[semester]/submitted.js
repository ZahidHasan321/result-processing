import AntDesignGrid from "@/component/customDatagrid/customDatagrid";
import DecodeDialog from "@/component/dialog/decodeDialog";
import Layout from "@/component/layout/layout";
import { semesterPages } from "@/constants/routes";
import { formatOrdinals } from "@/helper/ordinal";
import Loading from "@/pages/loading";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar";
import { GridToolbar } from "@mui/x-data-grid";
import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
const dayjs = require('dayjs')

const Submitted = () => {
  const router = useRouter();
  const query = router.query;

  const [rows, setRows] = useState([]);
  const [checked, setChecked] = useState(false);
  const [rowClick, setRowClick] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState(null);


  const handleRowClick = (params) => {
    setRowClick(params.row);
    setOpenDialog(true);
  }

  const getRows = async () => {
    await fetch('/api/examCommittee/semester/getSubmittedList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ session: query.session, semester: query.semester })
    })
      .then(res => res.json())
      .then(data => setRows(data))

    setChecked(true);

  }

  useEffect(() => {
    getRows()
  }, [query])

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
      minWidth: 200,
      valueFormatter: ({ value }) => formatOrdinals(value)
    },
    {
      field: "set_number",
      headerName: "Set",
      minWidth: 200,
    },
    {
      field: "submit_date",
      headerName: "Submit Date",
      minWidth: 250,
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
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
        <Box sx={{ pt: 2, pb: 2 }}>
          <AntDesignGrid
            sx={{ m: 4, boxShadow: 3, fontSize: '16px' }}
            autoHeight
            getRowId={(row) => row.course_code + row.semester + row.exam_session + row.set_number}
            checked={checked}
            onRowDoubleClick={handleRowClick}
            columns={columns}
            rows={rows}
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
      </Paper >
      {openDialog && <DecodeDialog open={openDialog} onClose={(notice) => { setOpenDialog(false); notice && setSnackbar(notice); getRows() }} data={rowClick} editableData={true} showName={true} />}
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

const HeaderLayout = ({ children }) => {
  const router = useRouter();
  const query = router.query;

  return (
    <>
      <Layout pages={semesterPages} query={query} idx={2}>
        {children}
      </Layout>
    </>
  );
};

Submitted.getLayout = function getLayout({ children }) {

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
      <HeaderLayout>
        <main>{children}</main>
      </HeaderLayout>
    )
  }
}
export default Submitted;