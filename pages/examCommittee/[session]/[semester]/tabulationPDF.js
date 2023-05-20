import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import TabulationView from "../../../../component/pdf/pdfViewer"
import { useRouter } from "next/router"
const dynamicPDF = dynamic(() => import("../../../../component/pdf/pdfViewer"), {
    ssr: false,
})

const Viewer = () => {
    const [client, setClient] = useState(false)
    const router = useRouter();
    const query = router.query;

    const [courseList, setCourseList] = useState([])
    const [memberList, setMemberList] = useState([])


    const getCourseList = async () => {
        if (query.semester != undefined) {
            await fetch('/api/admin/courses/courseList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query.semester)
            })
                .then(res => res.json())
                .then(data => {
                    setCourseList(data)
                })
        }
    }

    const getMemberList = async() => {
        if(query.semester != undefined && query.session != undefined){
            await fetch('/api/admin/committeeList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({session: query.session, semester: query.semester})
            })
                .then(res => res.json())
                .then(data => {
                    setMemberList(data)
                })
        }
    }

    useEffect(() => {
        setClient(true)
        getCourseList()
        getMemberList()
    }, [query.semester])

    if (courseList.length > 0) {
        return (
            <TabulationView session={query.session} semester={query.semester} courseList={courseList} memberList = {memberList}/>
        )
    }
    else {
        return (
            <>
                <p>waiting</p>
            </>
        )
    }
}
export default Viewer