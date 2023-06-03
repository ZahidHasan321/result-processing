import React from 'react';
import { Page, Text, View, Document, Font, Image } from '@react-pdf/renderer';
import styles from './styles';
import { formatOrdinals } from '@/helper/ordinal';
import dayjs from 'dayjs';

let monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

Font.register({ family: 'Times-Roman' });

// Create Document Component
const GradesheetPDF = ({ semester, session, courseList, memberList, tabularData, studentID, examInfo }) => {
    let totalCredit = 0
    let labNumber = 0
    let looper = []

    let it = 0
    let tcp = 0
    let tce = 0
    let startMonth = examInfo[0] ? dayjs(examInfo[0].start_date).month() : null
    let endMonth = examInfo[0] ? dayjs(examInfo[0].end_date).month() : null
    let improve = false;
    const letterGrade = (n) => {
        let grade
        if (n >= 80)
            grade = 'A+'
        else if (n >= 75 && n < 80)
            grade = 'A'
        else if (n >= 70 && n < 75)
            grade = 'A-'
        else if (n >= 65 && n < 70)
            grade = 'B+'
        else if (n >= 60 && n < 65)
            grade = 'B'
        else if (n >= 55 && n < 60)
            grade = 'B-'
        else if (n >= 50 && n < 55)
            grade = 'C+'
        else if (n >= 45 && n < 50)
            grade = 'C'
        else if (n >= 40 && n < 45)
            grade = 'D'
        else if (n >= 0 && n < 40)
            grade = 'F'
        return grade
    }

    const gradePoint = (g) => {
        let point = 0.00
        switch (g) {
            case 'A+':
                point = 4.00
                break;
            case 'A':
                point = 3.75
                break;
            case 'A-':
                point = 3.50
                break;
            case 'B+':
                point = 3.25
                break;
            case 'B':
                point = 3.00
                break;
            case 'B-':
                point = 2.75
                break;
            case 'C+':
                point = 2.50
                break;
            case 'C':
                point = 2.25
                break;
            case 'D':
                point = 2.00
                break;
        }
        return point
    }


    return (
        <Document >
            {
                studentID && studentID.map((student, idx) => {
                    return (
                        <Page key={idx} size="A4" style={styles.page} orientation="landscape">
                            <View style={{ display: 'flex', flexDirection: 'column' }}>
                                <View style={{ display: 'flex', flexDirection: 'row', height:'' }}>

                                    <View style={{ display: 'flex', flexDirection: 'column', marginLeft:'40px', fontFamily:'Times-Bold' }}>

                                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                                            <View>
                                                <Image src='/Cu_logo.jpg' style={{
                                                    height: '100px',
                                                    width: '80px',
                                                }} />
                                            </View>


                                            <View style={{ display: 'flex' ,flexDirection: 'column', fontSize: '12px', width: '280px', marginRight: '10px' }}>
                                                <Text style={{ textAlign: 'left' }}>University of Chittagong</Text>
                                                <Text style={{ textAlign: 'left' }}>Faculty of Engineering</Text>
                                                <Text style={{ textAlign: 'left' }}>Department of Computer Science & Enginerring</Text>
                                                <Text style={{ textAlign: 'left' }}>{`${formatOrdinals(semester)} Semester BSc Engineering Examination ${session}`}</Text>
                                                <Text style={{ textAlign: 'left' }}>Held in: {monthsArray[startMonth]} - {monthsArray[endMonth]} {dayjs(examInfo.start_date).year()}</Text>
                                                <Text style={{ textAlign: 'left' }}>Tabulation Sheet</Text>
                                            </View>
                                        </View>

                                        <View style={{ display: "flex", flexDirection: 'column', fontSize: '12px', marginLeft:'20px'}}>
                                            <Text>Serial No. :  R{idx + 1}</Text>
                                            <Text>Student ID :  {student.roll}</Text>
                                            <Text>Name       :  {student.name}</Text>
                                            <Text>Hall       :  {student.hall}</Text>
                                            <Text>Session    :  {student.session}</Text>
                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', border: 1, flexDirection: 'column', fontSize: '12px', width: '40%',height:'160px', marginRight: '50px', marginLeft:'auto' }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '60%', textAlign: 'center', borderRight: 1, fontFamily: "Times-Bold" }}>Numerical Grade</Text>
                                            <Text style={{ width: '20%', textAlign: 'center', borderRight: 1, fontFamily: "Times-Bold" }}>letter Grade</Text>
                                            <Text style={{ textAlign: 'center', width: '20%', fontFamily: "Times-Bold" }}>Grade Point</Text>
                                        </View>

                                        <View style={{ display: 'flex',flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '60%', textAlign: 'center', borderRight: 1 }}>80% to 100%</Text>
                                            <Text style={{ width: '20%', textAlign: 'center', borderRight: 1 }}>A+</Text>
                                            <Text style={{ textAlign: 'center', width: '20%' }}>4.00</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '60%', textAlign: 'center', borderRight: 1 }}>{'75% to Less Than <80%'}</Text>
                                            <Text style={{ width: '20%', textAlign: 'center', borderRight: 1 }}>A</Text>
                                            <Text style={{ textAlign: 'center', width: '20%' }}>3.75</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '60%', textAlign: 'center', borderRight: 1 }}>{'70% to Less Than <75%'}</Text>
                                            <Text style={{ width: '20%', textAlign: 'center', borderRight: 1 }}>A-</Text>
                                            <Text style={{ textAlign: 'center', width: '20%' }}>3.50</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '60%', textAlign: 'center', borderRight: 1 }}>{'65% to Less Than <70%'}</Text>
                                            <Text style={{ width: '20%', textAlign: 'center', borderRight: 1 }}>B+</Text>
                                            <Text style={{ textAlign: 'center', width: '20%' }}>3.25</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '60%', textAlign: 'center', borderRight: 1 }}>{'60% to Less Than <65%'}</Text>
                                            <Text style={{ width: '20%', textAlign: 'center', borderRight: 1 }}>B</Text>
                                            <Text style={{ textAlign: 'center', width: '20%' }}>3.00</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '60%', textAlign: 'center', borderRight: 1 }}>{'55% to Less Than <60%'}</Text>
                                            <Text style={{ width: '20%', textAlign: 'center', borderRight: 1 }}>B-</Text>
                                            <Text style={{ textAlign: 'center', width: '20%' }}>2.75</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '60%', textAlign: 'center', borderRight: 1 }}>{'50% to Less Than <55%'}</Text>
                                            <Text style={{ width: '20%', textAlign: 'center', borderRight: 1 }}>C+</Text>
                                            <Text style={{ textAlign: 'center', width: '20%' }}>2.50</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '60%', textAlign: 'center', borderRight: 1 }}>{'45% to Less Than <50%'}</Text>
                                            <Text style={{ width: '20%', textAlign: 'center', borderRight: 1 }}>C</Text>
                                            <Text style={{ textAlign: 'center', width: '20%' }}>2.25</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '60%', textAlign: 'center', borderRight: 1 }}>{'40% to Less Than <45%'}</Text>
                                            <Text style={{ width: '20%', textAlign: 'center', borderRight: 1 }}>D</Text>
                                            <Text style={{ textAlign: 'center', width: '20%' }}>2.00</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom:1}}>
                                            <Text style={{ width: '60%', textAlign: 'center', borderRight: 1 }}>{' Less Than <40% '}</Text>
                                            <Text style={{ width: '20%', textAlign: 'center', borderRight: 1 }}>F</Text>
                                            <Text style={{ textAlign: 'center', width: '20%' }}>0.00</Text>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Text style={{ width: '60%', textAlign: 'center', borderRight: 1 }}>{' Incomplete/Absent'}</Text>
                                            <Text style={{ width: '20%', textAlign: 'center', borderRight: 1 }}>X</Text>
                                            <Text style={{ textAlign: 'center', width: '20%' }}>X</Text>
                                        </View>
                                    </View>

                                </View>


                                <View style={{ display: 'flex', flexDirection: 'row', marginLeft: '30px' }}>
                                    <View style={{ display: 'flex', flexDirection: 'column', fontSize: '8px', marginRight: '140px' }}>
                                        <Text style={{ fontFamily: "Times-Bold", marginBottom: '20px' }} >Tabulator</Text>

                                        {
                                            memberList && memberList.map((member, idx) => {
                                                if (member.role === 'Tabulator' || member.role === 'Chairman') {
                                                    return (
                                                        <Text key={idx} style={{ marginBottom: '10px' }}>{`${idx + 1}. ${member.name} ............................`}</Text>
                                                    )
                                                }
                                            })
                                        }
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', fontSize: '8px', marginRight: '120px' }}>
                                        <Text style={{ fontFamily: "Times-Bold", marginBottom: '20px' }} >Exam Committee</Text>

                                        {
                                            memberList && memberList.map((member, idx) => {
                                                let role = 'Member'
                                                if (member.role == 'Chairman') role = 'Chairman'
                                                return (
                                                    <Text key={idx} style={{ marginBottom: '10px' }}>{`${idx + 1}. ${member.name} (${role}) ............................`}</Text>
                                                )
                                            })
                                        }
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', fontSize: '8px' }}>
                                        <Text style={{ marginBottom: '30px' }}>Result Published on ..........................</Text>
                                        <Text style={{ marginLeft: 'auto' }}>Controller of Examinations</Text>
                                        <Text style={{ marginLeft: 'auto' }} >University of Chittagong</Text>
                                    </View>

                                </View>
                            </View>
                        </Page>
                    )
                })

            }
        </Document >
    )
};

export default GradesheetPDF