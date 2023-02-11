import Layout from "@/component/layout/layout";
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
      <Layout pages={examinerPages}>
        <main>{page}</main>
      </Layout>
    )
  }

export default Current;