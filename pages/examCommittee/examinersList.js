import PortalLayout from "@/component/layout/portalLayout";
import { committeePages } from "@/constants/routes";

const ExaminersList = () => {
    return(
        <>
            <h1>List</h1>
        </>
    )
}

ExaminersList.getLayout = function getLayout(page){
    return (
      <PortalLayout pages={committeePages}>
        <main>{page}</main>
      </PortalLayout>
    )
  }
export default ExaminersList;