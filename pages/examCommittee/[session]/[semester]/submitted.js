import Layout from "@/component/layout/layout";
import { semesterPages } from "@/constants/routes";
import { useRouter } from "next/router";

const Submitted = () => {
    return <h1>Submitted</h1>
}

Submitted.getLayout = function getLayout(page){
    const router = useRouter();
    const query = router.query;

    return (
      <Layout pages={semesterPages} query={query}>
        <main>{page}</main>
      </Layout>
    )
  }

export default Submitted;