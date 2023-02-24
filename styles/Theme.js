const { createTheme } = require("@mui/material");

const Theme = createTheme({
  
  palette: {
    mode: 'light',
    primary: {
      main: '#2c1630',
    }
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            scale: '1.04'
          }
        }
      }
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {

        },
        columnHeaderTitle: {
          fontWeight: 'bold'
        },
        columnHeader: {
          backgroundColor: '#f2f2f2',
          height: '50px'
        },
        columnSeparator: {

        },
        GridColDef: {
          headerAlign: 'center',
        }
      },
    },
  },
})

export default Theme;