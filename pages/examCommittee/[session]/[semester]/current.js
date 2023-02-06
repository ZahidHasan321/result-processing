import PortalLayout from "@/component/layout/portalLayout";
import { committeePages } from "@/constants/routes";
import { useRouter } from "next/router";

const Current = () => {
    return <h1>Current</h1>
}

Current.getLayout = function getLayout(page){
    const router = useRouter();
    const query = router.query;

    return (
      <PortalLayout pages={committeePages} query={query}>
        <main>{page}</main>
      </PortalLayout>
    )
  }

export default Current;