import DrawerLayout from "@/component/layout/drawerLayout";
import Layout from "@/component/layout/layout";
import { committeePages } from "@/constants/routes";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const columns = [
  {
    field: "exam_session",
    headerName: "Exam Session",
    minWidth: 200,
    flex:1
  },
  {
    field: "semester",
    headerName: "Semester",
    minWidth: 200,
    flex:1
  },
  {
    field: "role",
    headerName: "Role",
    minWidth: 200,
    flex:1
  },
  {
    field: "published",
    headerName: "published",
    type:"boolean",
    minWidth: 200,
    flex:1
  }
]

const History = () => {
  const [list, setList] = useState(null);
  const router = useRouter();
  async function getList()
  {
    const {user} = await getSession();
     await fetch('/api/examCommittee/committeeLogHistroy',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(user.id)
    }).then(res => res.json())
    .then(data => setList(data));
  }

  function handleRowClick(event)
  {
    const rowData = event.row;
    const url = `/examCommittee/${rowData.exam_session}/${rowData.semester}/dashboard`
    router.push(url);
  }
  
  useEffect(()=>{
    getList();
  },[])

  if(!list) return <div> loading </div>

  return(
        <Box sx={{m: '20px', pr:"40px", width:1550}}>
        <DataGrid 
            rows={list}
            columns={columns}
            pageSize={10}
            autoHeight
            disableSelectionOnClick
            getRowId={(row) => row.id + row.exam_session + row.semester}
            onRowClick={handleRowClick}
            rowsPerPageOptions={[10]}
            disableColumnSelector
            disableDensitySelector
            components={{ Toolbar: GridToolbar }}
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
    )

}
History.getLayout = function getLayout(page){
    return (
      <Layout pages={committeePages}>
        <main>{page}</main>
      </Layout>
    )
  }
export default History;