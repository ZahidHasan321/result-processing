import { deepPurple } from "@mui/material/colors";

const { createTheme } = require("@mui/material");

const Theme = createTheme({

  palette: {
    mode: 'light',
    primary: deepPurple,
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f0f0f0'
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
        contained: {
          backgroundColor: '#2c1630',
          ":hover": {
            backgroundColor: '#2c1630'
          }
        },
        root: {
          '&:hover': {
            scale: '1.04',

          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 3
        }
      }
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          boxShadow: 3
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