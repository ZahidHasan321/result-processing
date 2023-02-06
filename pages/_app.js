import { CssBaseline, ThemeProvider } from "@mui/material"
import { SessionProvider } from "next-auth/react"
import theme from "@/styles/Theme"

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
  <SessionProvider session={pageProps.session}>
  <ThemeProvider theme={theme}>
  <CssBaseline />
  <Component {...pageProps} />
  </ThemeProvider>
  </SessionProvider>
  )
}
