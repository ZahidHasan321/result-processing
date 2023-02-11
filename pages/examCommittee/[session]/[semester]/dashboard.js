import DrawerLayout from "@/component/layout/drawerLayout";
import Layout from "@/component/layout/layout";
import { semesterPages } from "@/constants/routes";
import { useRouter } from "next/router";


const Dashboard = () => {
    return <h1>Dashboard</h1>
}

Dashboard.getLayout = function getLayout(page){
    const router = useRouter();
    const query = router.query;

    return (
      <Layout pages={semesterPages} query={query}>
        <main>{page}</main>
      </Layout>
    )
  }

export default Dashboard;