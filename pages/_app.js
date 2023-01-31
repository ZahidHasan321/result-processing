import { CssBaseline } from "@mui/material"
import { SessionProvider } from "next-auth/react"
import Layout from "@/component/layout/layout"
import { useRouter } from "next/router"

export default function App({ Component, pageProps }) {
  const router = useRouter();

  if(router.pathname == "/auth/signin"){
    return(
      <>
      <SessionProvider session={pageProps.session}>
      <CssBaseline />
      <Component {...pageProps} />
      </SessionProvider>
      </>
    )
  }

  return (
  <SessionProvider session={pageProps.session}>
  <Layout>
  <CssBaseline />
  <Component {...pageProps} />
  </Layout>
  </SessionProvider>
  )
}
