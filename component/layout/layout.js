import ResponsiveDrawer from "../drawer/persistantDrawer";

const DrawerLayout = ({children, ...restProps}) => {
    return(
        <>
        <ResponsiveDrawer {...restProps}>
            {children}
        </ResponsiveDrawer>
        </>
    )
}

export default DrawerLayout;