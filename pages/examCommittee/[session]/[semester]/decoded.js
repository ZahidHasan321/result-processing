import Layout from "@/component/layout/layout";
import { semesterPages } from "@/constants/routes";
import { useRouter } from "next/router";

const Decoded = () => {
    return <h1>Decoded</h1>
}

Decoded.getLayout = function getLayout(page){
    const router = useRouter();
    const query = router.query;

    return (
      <Layout pages={semesterPages} query={query}>
        <main>{page}</main>
      </Layout>
    )
  }

export default Decoded;