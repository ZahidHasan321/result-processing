import { useSession } from "next-auth/react"
import Router from "next/router"
import Layout from "@/component/layout/layout";

const AccessDenied = () => {
    return (
        <>
            <h1>Access Denied</h1>
            <h3>You need to be an admin to access this part</h3>
        </>
    )
}

AccessDenied.getLayout = function getLayout({ children }) {
    const { data, status } = useSession()

    if (status === 'loading') {
        return <p>loading</p>
    }

    if (status === 'unauthenticated') {
        Router.replace('/auth/signin')
    }

    if (status === 'authenticated' && data.user.role !== 'Teacher') {
        Router.replace('/accessDenied')
    }

    return (
        <Layout>
            <main>{children}</main>
        </Layout>
    )
}

export default AccessDenied