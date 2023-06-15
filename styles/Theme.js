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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b white",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "white",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
            border: "3px solid white",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
  },
})

export default Theme;