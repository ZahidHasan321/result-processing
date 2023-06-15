import AntDesignGrid from "@/component/customDatagrid/customDatagrid";
import ConfirmDialog from "@/component/dialog/ConfirmDialog";
import DecodeDialog from "@/component/dialog/decodeDialog";
import Layout from "@/component/layout/layout";
import { semesterPages } from "@/constants/routes";
import { formatOrdinals } from "@/helper/ordinal";
import Loading from "@/pages/loading";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import UndoIcon from '@mui/icons-material/Undo';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { GridToolbar } from "@mui/x-data-grid";
import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
const dayjs = require('dayjs')

const Decoded = () => {
  const router = useRouter();
  const query = router.query;

  const [rows, setRows] = useState([]);
  const [checked, setChecked] = useState(false);
  const [rowClick, setRowClick] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [params, setParams] = useState(null);
  const [snackbar, setSnackbar] = useState(null);



  const handleRowClick = (params) => {
    setRowClick(params.row);
    setOpenDialog(true);
  }
  const getRows = async () => {
    await fetch('/api/examCommittee/semester/getDecodedList', {
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

  const handleOnUndo = (params) => {
    setParams(params)
    setOpenConfirm(true)
  }

  const handleRowUndoClick = async (params) => {
    await fetch('/api/examCommittee/semester/undoMarksheet', {
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
    getRows()
  }, [query])

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
      field: "decode_date",
      headerName: "Decode Date",
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
        
        <Box sx={{ pt: 2, pb: 2 }}>
          <AntDesignGrid
            sx={{ m: 4, boxShadow: 3, fontSize: '16px' }}
            autoHeight
            getRowId={(row) => row.course_code + row.semester + row.exam_session + row.set_number}
            checked={checked}
            columns={columns}
            rows={rows}
            onRowDoubleClick={handleRowClick}
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
      </Paper >{openDialog && <DecodeDialog open={openDialog} onClose={() => setOpenDialog(false)} data={rowClick} editableData={false} showName={false} />}
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
    </Box >
  )
}



const HeaderLayout = ({ children }) => {
  const router = useRouter();
  const query = router.query;

  return (
    <>
      <Layout pages={semesterPages} query={query} idx={3}>
        {children}
      </Layout>
    </>
  );
};

Decoded.getLayout = function getLayout({ children }) {

  const { data, status } = useSession();
  const router = useRouter();
  const { session, semester } = router.query

  const isAssigned = async (session, semester, id) => {
    const assigned = await fetch('/api/examCommittee/semester/isAssigned', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ session, semester, id })
    })
      .then(res => res.json())
      .then(data => data[0].exists)

    return assigned;
  }

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

export default Decoded;