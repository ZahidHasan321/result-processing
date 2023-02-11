import DrawerLayout from "@/component/layout/drawerLayout";
import Layout from "@/component/layout/layout";
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
      <Layout pages={examinerPages}>
        <main>{page}</main>
      </Layout>
    )
  }
  

export default History;