import MyDocument from "@/component/pdf/gradesheet";
import { PDFViewer } from "@react-pdf/renderer";

const Gradesheet = () => {
    return (
        <PDFViewer>
            <MyDocument />
        </PDFViewer>
    )
}

export default Gradesheet;