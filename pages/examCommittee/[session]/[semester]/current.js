import Layout from "@/component/layout/layout";
import { semesterPages } from "@/constants/routes";
import { useRouter } from "next/router";

const Current = () => {
    return <h1>Current</h1>
}

Current.getLayout = function getLayout(page){
    const router = useRouter();
    const query = router.query;

    return (
      <Layout pages={semesterPages} query={query}>
        <main>{page}</main>
      </Layout>
    )
  }

export default Current;