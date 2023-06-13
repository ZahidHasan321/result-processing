import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import TabulationView from "../../../../component/pdf/pdfViewer"
import Router, { useRouter } from "next/router"
import { useSession } from "next-auth/react"
const dynamicPDF = dynamic(() => import("../../../../component/pdf/pdfViewer"), {
    ssr: false,
})

const Viewer = () => {
    const [client, setClient] = useState(false)
    const router = useRouter();
    const query = router.query;

    const [courseList, setCourseList] = useState([])
    const [memberList, setMemberList] = useState([])
    const [tabularData, setTabularData] = useState([])
    const [studentID, setStudentID] = useState([])
    const [examInfo, setExamInfo] = useState([])

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

    const getMemberList = async () => {
        if (query.semester != undefined && query.session != undefined) {
            await fetch('/api/admin/committeeList', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ session: query.session, semester: query.semester })
            })
                .then(res => res.json())
                .then(data => {
                    setMemberList(data)
                })
        }
    }

    const getTabularData = async () => {
        if (query.semester != undefined && query.session != undefined) {
            await fetch('/api/examCommittee/semester/getTabularData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ session: query.session, semester: query.semester })
            })
                .then(res => res.json())
                .then(data => {
                    setTabularData(Object.entries(data))
                })
        }
    }

    const getStudentID = async () => {
        if (query.semester != undefined && query.session != undefined) {
            await fetch('/api/admin/student/getStudentIDs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ session: query.session, semester: query.semester })
            })
                .then(res => res.json())
                .then(data => {
                
                    setStudentID(data)
                })
        }
    }

    const getExamInfo = async () => {
        await fetch('/api/examCommittee/semester/getExamInfo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ semester: query.semester, session: query.session })
        })
          .then(res => res.json())
          .then(data => {
            setExamInfo(data)
          })
      }

    useEffect(() => {
        setClient(true)
        getCourseList()
        getMemberList()
        getTabularData()
        getStudentID()
        getExamInfo()
    }, [query.semester])

    if (courseList.length > 0) {
        return (
            <TabulationView session={query.session} semester={query.semester} courseList={courseList} memberList={memberList} tabularData={tabularData} studentID = {studentID} examInfo = {examInfo}/>
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

Viewer.getLayout = function getLayout({ children }) {

    const { data, status } = useSession()
  
    if (status === 'loading') {
      return <p>loading</p>
    }
  
    if (status === 'unauthenticated') {
      Router.replace('/auth/signin')
    }
  
    if (status === 'authenticated' && data.user.role !== 'Teacher') {
      Router.replace('/accessDenied')
    }
  
    return (
      <>
        <main>{children}</main>
      </>
    )
  }
export default Viewer