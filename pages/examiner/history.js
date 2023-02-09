import DrawerLayout from "@/component/layout/drawerLayout";
import { examinerPages } from "@/constants/routes";

const History = () => {
    return(
        <>
            <h1>History</h1>
        </>
    )
}


History.getLayout = function getLayout(page) {
    return (
      <DrawerLayout pages={examinerPages}>
        <main>{page}</main>
      </DrawerLayout>
    )
  }
  

export default History;