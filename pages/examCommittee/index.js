import AntDesignGrid from "@/component/customDatagrid/customDatagrid";
import Layout from "@/component/layout/layout";
import { committeePages } from "@/constants/routes";
import { formatOrdinals } from "@/helper/ordinal";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { GridToolbar } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { getSession, useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../loading";



const Home = () => {
  const [list, setList] = useState([]);
  const [checked, setChecked] = useState(false)

  const router = useRouter();
  
  async function getList() {
    const { user } = await getSession();
    await fetch('/api/examCommittee/committeeLog', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user.id)
    }).then(res => res.json())
      .then(data => {

        setList(data.map(({ semester, ...list }) => ({
          ...list,
          semester: formatOrdinals(semester)
        })))
        setChecked(true);
      });
  }

  function handleRowClick(event) {

    const rowData = event.row;
    let s = rowData.semester;
    s = s.substring(0, s.length - 2)
    const url = `/examCommittee/${rowData.exam_session}/${s}/`
    router.push(url);
  }

  useEffect(() => {
    getList();
  }, [])

  const columns = [
    {
      field: "exam_session",
      headerName: "Exam Session",
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
      field: "role",
      headerName: "Role",
      minWidth: 200,
      flex: 1
    },
    {
      field: "assigned_date",
      headerName: "Assigned Date",
      type: "date",
      valueFormatter: ({ value }) => value && dayjs(value).format('DD/MM/YYYY'),
      minWidth: 200,
      flex: 1
    },
    {
      field: "enter",
      headerName: "Open",
      width: 90,
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
    <Paper variant="Outlined" sx={{ boxShadow: 3, minHeight:'750px' }}>
      <Box >
        <Typography fontSize={30} sx={{ ml: 12, pt: 3 }}>IN PROGRESS</Typography>
        <Typography variant="caption" sx={{ ml:12 }}>Double click on row for more.</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          
            <Box sx={{ ml: 5, mr: 5, mb: 3, width: '90%' }}>
              <AntDesignGrid
                sx={{
                  '& .MuiDataGrid-cell:focus': {
                    outline: 'none',
                  },
                  boxShadow: 3, fontSize:'16px'
                }}
                rows={list}
                columns={columns}
                checked={checked}
                autoHeight
                getRowId={(row) => row.id + row.exam_session + row.semester}
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
        </Box>
      </Box>
    </Paper>
  )

}
Home.getLayout = function getLayout({children}) {

  const {data, status} = useSession()

  if (status === 'loading') {
    return <Loading />
  }

  if (status === 'unauthenticated') {
    Router.replace('/auth/signin')
  }

  if(status === 'authenticated' && data.user.role !== 'Teacher'){
    Router.replace('/accessDenied')
  }

  return (
    <Layout pages={committeePages} idx={1}>
      <main>{children}</main>
    </Layout>
  )
}
export default Home;