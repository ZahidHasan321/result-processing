import PortalLayout from "@/component/layout/portalLayout";
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
      <PortalLayout pages={examinerPages}>
        <main>{page}</main>
      </PortalLayout>
    )
  }
  

export default History;