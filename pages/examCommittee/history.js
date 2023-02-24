import AntDesignGrid from "@/component/customDatagrid/customDatagrid";
import Layout from "@/component/layout/layout";
import { committeePages } from "@/constants/routes";
import { formatOrdinals } from "@/helper/ordinal";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Button, Grow, Paper, Typography } from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";



const History = () => {
  const [list, setList] = useState([]);
  const [checked, setChecked] = useState(false)

  const router = useRouter();
  async function getList() {
    const { user } = await getSession();
    await fetch('/api/examCommittee/committeeLogHistroy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user.id)
    }).then(res => res.json())
      .then(data => {
        setList(data.map(({semester, ...list})=> ({
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
      field: "published",
      headerName: "Published",
      type: "boolean",
      minWidth: 200,
      flex: 1
    },
    {
      field: "publish_date",
      headerName: "Publish Date",
      
      minWidth: 200,
      flex: 1
    },
    {
      field: "enter",
      headerName: "Enter",
      width: 90,
      renderCell: (params) => {
        return (
          <Button onClick={(event) => { event.preventDefault();handleRowClick(params)}}>
          <NavigateNextIcon />
          </Button>
        )
      }
    }
  ]

  return (
    <Paper variant="Outlined" sx={{ m: 6, boxShadow: 3 }}>
      <Typography fontSize={30} sx={{ ml: 11, pt: 3 }}>History</Typography>
      <Typography variant="caption" sx={{ ml:11 }}>Double click on row for more.</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grow in={checked}>
          <Box sx={{ ml: 5, mr: 5, mb: 3, width: '90%' }}>
            <AntDesignGrid
              sx={{
                '& .MuiDataGrid-cell:focus': {
                  outline: 'none',
                },
                boxShadow:3
              }}
              rows={list}
              columns={columns}
              pageSize={10}
              autoHeight
              checked={checked}
              getRowId={(row) => row.id + row.exam_session + row.semester}
              onRowDoubleClick={handleRowClick}
              rowsPerPageOptions={[10]}
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
        </Grow>
      </Box>
    </Paper>
  )

}
History.getLayout = function getLayout(page) {
  return (
    <Layout pages={committeePages}>
      <main>{page}</main>
    </Layout>
  )
}
export default History;