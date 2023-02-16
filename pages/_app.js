import { CssBaseline, ThemeProvider } from "@mui/material"
import { SessionProvider } from "next-auth/react"
import Theme from "@/styles/Theme"

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}
