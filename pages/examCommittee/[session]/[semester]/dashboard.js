import PortalLayout from "@/component/layout/portalLayout";
import { committeePages } from "@/constants/routes";
import { useRouter } from "next/router";


const Dashboard = () => {
    return <h1>Dashboard</h1>
}

Dashboard.getLayout = function getLayout(page){
    const router = useRouter();
    const query = router.query;

    return (
      <PortalLayout pages={committeePages} query={query}>
        <main>{page}</main>
      </PortalLayout>
    )
  }

export default Dashboard;