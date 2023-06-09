import ResponsiveDrawer from "../drawer/persistantDrawer";

const DrawerLayout = ({ children, showDrawer, ...restProps }) => {
    return (
        <>
            <ResponsiveDrawer {...restProps}>
                {children}
            </ResponsiveDrawer>
        </>
    )
}

export default DrawerLayout;