import AntDesignGrid from "@/component/customDatagrid/customDatagrid";
import Close from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { parse } from "csv-parse/browser/esm/sync";
import { useEffect, useRef, useState } from "react";
import UploadStudentDialog from "../dialog/uploadStudentDialog";



const columns = [
  {
    field: "id",
    headerName: "ID",
    minWidth: 200,
    flex:1
  },
  {
    field: "name",
    headerName: "Name",
    minWidth: 200,
    flex:1
  },
  {
    field: "hall",
    headerName: "Hall",
    minWidth: 200,
    flex:1
  },
];

const StudentImporter = () => {
  const [csvData, setCsvData] = useState([]);
  const [filename, setFilename] = useState("");
  const [checked, setChecked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState(null);

  const inputRef = useRef(null);

  const handleFileUpload = (e) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    const { name } = file;
    setFilename(name);


    const reader = new FileReader();

    reader.onload = (evt) => {
      if (!evt?.target?.result) {
        return;
      }

      const { result } = evt.target;

      const records = parse(result, {
        columns: ["id", "name", "hall"],
        delimiter: [",", ":", ";"],
        trim: true,
        skip_empty_lines: true,
        skip_records_with_empty_values: true
      });
      if(records[0].id === 'id'){
        records.shift();
      }

      setCsvData(records);
    };
    reader.readAsBinaryString(file);
  };

  useEffect(() => {
    if (csvData.length > 0)
      setChecked(true);
  }, [csvData])

  const handleUpload = async() => {
    if(csvData.length > 0)
      setOpenDialog(true);
    else{
      setSnackbar({children:'No file selected', severity:'error'})
    }
  }

  return (
    <Box sx={{flexGrow:1, flexShrink:0}}>
        <Box sx={{ pt:3, pb:3, display:'flex', flexDirection:'column' }}>
          <Box sx={{display:'flex'}}>
          <Button
            component="label"
            variant="contained"
            startIcon={<UploadFileIcon />}
            sx={{ marginRight: "1rem" }}
          >
            Upload CSV
            <input ref={inputRef} type="file" accept=".csv" hidden onChange={handleFileUpload} />
          </Button>
          <Button  variant='contained' sx={{bgcolor:'red', ":hover":{ bgcolor:'red'}}} onClick={() => { setFilename(''); setCsvData([]); inputRef.current.value = null }}><Close /></Button>
          <Button variant='contained' sx={{ml:'auto'}} onClick={handleUpload}>Upload To DB</Button>
          </Box>
          <Box sx={{mb:2, mt:1}}>Filename: {filename}</Box>
          
          <AntDesignGrid
            sx={{ boxShadow: 3}}
            autoHeight
            checked={checked}
            rows={csvData}
            columns={columns}
          />
        </Box>
        {csvData.length > 0 &&  openDialog && <UploadStudentDialog list={csvData} open={openDialog} onClose={() => {setOpenDialog(false)}} filename = {filename}/>}
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


export default StudentImporter;