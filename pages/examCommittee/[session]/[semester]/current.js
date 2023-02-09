import DrawerLayout from "@/component/layout/drawerLayout";
import { semesterPages } from "@/constants/routes";
import { useRouter } from "next/router";

const Current = () => {
    return <h1>Current</h1>
}

Current.getLayout = function getLayout(page){
    const router = useRouter();
    const query = router.query;

    return (
      <DrawerLayout pages={semesterPages} query={query}>
        <main>{page}</main>
      </DrawerLayout>
    )
  }

export default Current;