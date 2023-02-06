import MenuAppBar from "../appbar/appbar";

const Layout = ({children}) => {
    return(
        <>
        <MenuAppBar/>
        <main>{children}</main>
        </>
    )
}

export default Layout;