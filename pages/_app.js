import { CssBaseline, ThemeProvider } from "@mui/material"
import { SessionProvider } from "next-auth/react"
import NextNProgress from 'nextjs-progressbar';
import theme from "@/styles/Theme"

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
  <SessionProvider session={pageProps.session}>
  <ThemeProvider theme={theme}>
  <CssBaseline />
  <NextNProgress />
  <Component {...pageProps} />
  </ThemeProvider>
  </SessionProvider>
  )
}
