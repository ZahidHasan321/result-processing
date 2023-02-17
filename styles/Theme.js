const { createTheme } = require("@mui/material");

const Theme = createTheme({
    palette:{
        primary:{
            main:'#2c1630'
        }
    },

    components: {
        
        MuiDataGrid: {
          styleOverrides: {
            root:{
              
            },
            columnHeaderTitle:{
            },
            columnHeader:{
              backgroundColor:'#f2f2f2',
              height:'50px'
            },
            columnSeparator:{
              
            },
            GridColDef:{
              headerAlign: 'center',
            }
          },
        },
      },
})

export default Theme;