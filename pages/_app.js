import Theme from "@/styles/Theme"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/"
import { SessionProvider } from "next-auth/react"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


export default function App({ Component, pageProps }) {
  const GetLayout = Component.getLayout || ((page) => page);


  return (
    <SessionProvider session={pageProps.session} >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <GetLayout>
            <Component {...pageProps} />
          </GetLayout>
        </ThemeProvider>
      </LocalizationProvider>
    </SessionProvider>

  )
}
