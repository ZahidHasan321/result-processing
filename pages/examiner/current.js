import DrawerLayout from "@/component/layout/drawerLayout";
import { examinerPages } from "@/constants/routes";

const Current = () => {
    return(
        <>
            <h1>Current</h1>
        </>
    )
}

Current.getLayout = function getLayout(page) {
    return (
      <DrawerLayout pages={examinerPages}>
        <main>{page}</main>
      </DrawerLayout>
    )
  }

export default Current;