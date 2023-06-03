import { PDFViewer } from "@react-pdf/renderer/lib/react-pdf.browser.cjs.js"
import GradesheetPDF from "./gradesheet_pdf"



const GradesheetView = ({session, semester, courseList, memberList, tabularData, studentID, examInfo}) => {

    return(
        <PDFViewer style={{ 
            display: 'flex',
            alignSelf: 'center',
            justifySelf: 'center',
            width: '100vw', 
            height: '100vh' 
            }}>
            <GradesheetPDF session={session} semester={semester} courseList = {courseList} memberList = {memberList} tabularData = {tabularData} studentID = {studentID} examInfo={examInfo}/>
        </PDFViewer>
    )
}

export default GradesheetView