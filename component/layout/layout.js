import ResponsiveDrawer from "../drawer/persistantDrawer";
import Head from "next/head";


const DrawerLayout = ({ children, showDrawer, ...restProps }) => {
    return (
        <>
        <Head>
            <title>Result Processing System</title>
        </Head>
            <ResponsiveDrawer {...restProps}>
                {children}
            </ResponsiveDrawer>
        </>
    )
}

export default DrawerLayout;