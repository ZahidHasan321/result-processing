import AntDesignGrid from "@/component/customDatagrid/customDatagrid";
import CATMdialog from "@/component/dialog/catmDialog";
import Layout from "@/component/layout/layout";
import { semesterPages } from "@/constants/routes";
import { formatOrdinals } from "@/helper/ordinal";
import Loading from "@/pages/loading";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { GridToolbar } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UndoIcon from '@mui/icons-material/Undo';
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import ConfirmDialog from "@/component/dialog/ConfirmDialog";

const CATM = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [list, setList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [clickedRow, setClickedRow] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [params, setParams] = useState(null);

  const router = useRouter()
  const query = router.query

  const handleRowClick = (params) => {
    setClickedRow(params.row)
    setOpenDialog(true);
  }

  const handleCloseSnackbar = () => setSnackbar(null);

  const getList = async () => {
    await fetch('/api/examCommittee/semester/getCatm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ semester: query.semester, session: query.session })
    })
      .then(res => res.json())
      .then(data => setList(data))

    setChecked(true);
  }


  const handleOnUndo = (param) => {
    setOpenConfirm(true);
    setParams(param)
  }

  const handleRowUndoClick = async (params) => {
    await fetch('/api/examCommittee/semester/undoCatm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params.row)
    })
      .then(res => res.json())
      .then(data => setSnackbar(data))
  }

  useEffect(() => {
    getList()
  }, [query.semester])

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
      flex: 1,
      valueFormatter: ({ value }) => formatOrdinals(value)
    },
    {
      field: "exam_session",
      headerName: "Exam Session",
      minWidth: 200,
      flex: 1
    },
    {
      field: "submit_date",
      headerName: "Submit Date",
      minWidth: 200,
      flex: 1,
      valueFormatter: ({ value }) => value && dayjs(value).format('DD/MM/YYYY'),
    },
    {
      field: "open",
      headerName: "Open",
      width: 100,
      renderCell: (params) => {
        return (
          <Button onClick={(event) => { event.preventDefault(); handleRowClick(params) }}>
            <ArrowForwardIosIcon />
          </Button>
        )
      }
    },
    {
      field: "undo",
      headerName: "Undo",
      width: 100,
      renderCell: (params) => {
        return (
          <Button onClick={(event) => { event.preventDefault(); handleOnUndo(params) }}>
            <UndoIcon />
          </Button>
        )
      }
    }
  ]

  return (
    <Box>
      <Paper sx={{ boxShadow: 3, minHeight: '750px' }}>

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
      {openDialog && <CATMdialog open={openDialog} onClose={() => setOpenDialog(false)} data={clickedRow} editableData={false} />}
      <ConfirmDialog open={openConfirm} message={'Are you sure you want to Undo?'} onConfirm={handleRowUndoClick} params={params} onClose={() => setOpenConfirm(false)} label={'Confirm'} />

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


const HeaderLayout = ({ children }) => {
  const router = useRouter();
  const query = router.query;

  return (
    <>
      <Layout pages={semesterPages} query={query} idx={4}>
        {children}
      </Layout>
    </>
  );
};

CATM.getLayout = function getLayout({ children }) {
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
    <HeaderLayout>
      <main>{children}</main>
    </HeaderLayout>
  )
}


export default CATM;