import DrawerLayout from "@/component/layout/drawerLayout";
import { semesterPages } from "@/constants/routes";
import { useRouter } from "next/router";


const Dashboard = () => {
    return <h1>Dashboard</h1>
}

Dashboard.getLayout = function getLayout(page){
    const router = useRouter();
    const query = router.query;

    return (
      <DrawerLayout pages={semesterPages} query={query}>
        <main>{page}</main>
      </DrawerLayout>
    )
  }

export default Dashboard;