import AntDesignGrid from "@/component/customDatagrid/customDatagrid";
import DecodeDialog from "@/component/dialog/decodeDialog";
import Layout from "@/component/layout/layout";
import { semesterPages } from "@/constants/routes";
import { formatOrdinals } from "@/helper/ordinal";
import Loading from "@/pages/loading";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
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

  useEffect(() => {
    getRows()
  }, [query])

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
      field: "set_number",
      headerName: "Set",
      minWidth: 200,
      flex: 1
    },
    {
      field: "submit_date",
      headerName: "Submit Date",
      minWidth: 200,
      flex: 1,
      valueFormatter: (params) => dayjs(params.value).format('DD/MM/YYYY'),
    },
    {
      field: "decode_date",
      headerName: "Decode Date",
      minWidth: 200,
      flex: 1,
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
      </Paper >{openDialog && <DecodeDialog open={openDialog} onClose={() => setOpenDialog(false)} data={rowClick} editableData={false} showName={false} />}

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