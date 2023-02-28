const { createTheme } = require("@mui/material");

const Theme = createTheme({
  
  palette: {
    mode: 'light',
    primary: {
      main: '#2c1630',
    },
    background:{
      default:'#f0f0f0'
    }
  },

  

  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',

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