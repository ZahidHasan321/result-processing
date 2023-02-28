import AntDesignGrid from "@/component/customDatagrid/customDatagrid";
import DecodeDialog from "@/component/dialog/decodeDialog";
import Layout from "@/component/layout/layout";
import { semesterPages } from "@/constants/routes";
import { formatOrdinals } from "@/helper/ordinal";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
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
        <Box sx={{ m: 5, pt: 5, pb: 5 }}>
          <AntDesignGrid
            sx={{ boxShadow: 3 }}
            autoHeight
            getRowId={(row) => row.course_code + row.semester + row.exam_session+row.set_number}
            checked={checked}
            columns={columns}
            rows={rows}
          />
        </Box>
      </Paper >{openDialog && <DecodeDialog open={openDialog} onClose={() => setOpenDialog(false)} data={rowClick} editableData={false} showName = {false} />}

    </Box >
  )
}



Decoded.getLayout = function getLayout(page) {
  const router = useRouter();
  const query = router.query;

  return (
    <Layout pages={semesterPages} query={query}>
      <main>{page}</main>
    </Layout>
  )
}

export default Decoded;