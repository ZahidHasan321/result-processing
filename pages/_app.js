import Theme from "@/styles/Theme"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { SessionProvider } from "next-auth/react"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <SessionProvider session={pageProps.session}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </LocalizationProvider>
    </SessionProvider>
  )
}
