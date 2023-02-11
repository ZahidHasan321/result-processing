import MenuAppBar from "../appbar/appbar";

const Layout = ({children, ...restProps}) => {
    return(
        <>
        <MenuAppBar {...restProps}/>
        <main>{children}</main>
        </>
    )
}

export default Layout;