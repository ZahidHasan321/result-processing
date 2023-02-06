import PortalLayout from "@/component/layout/portalLayout";
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
      <PortalLayout pages={examinerPages}>
        <main>{page}</main>
      </PortalLayout>
    )
  }

export default Current;