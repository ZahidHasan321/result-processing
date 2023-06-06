import React from 'react';
import { Page, Text, View, Document, Font, Image } from '@react-pdf/renderer';
import styles from './styles';
import { formatOrdinals } from '@/helper/ordinal';
import dayjs from 'dayjs';

let monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

Font.register({ family: 'Times-Roman' });

// Create Document Component
const GradesheetPDF = ({ semester, session, tabularData, examInfo }) => {
    let tco = 0;
    let tce = 0;
    let tcp = 0;
    let startMonth = examInfo[0] ? dayjs(examInfo[0].start_date).month() : null
    let endMonth = examInfo[0] ? dayjs(examInfo[0].end_date).month() : null
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
                tabularData && tabularData.map((student, idx) => {
                    let id = String(student[0]).substring(0, 2);
                    let stud_session = '20' + id;

                    stud_session = Number(stud_session);
                    return (
                        <Page key={idx} size="A4" style={styles.page} orientation="landscape">
                            <View style={{ display: 'flex', flexDirection: 'column', height:'500px' }}>

                                <View style={{ display: 'flex', flexDirection: 'row', height: '' }}>
                                    <View style={{ display: 'flex', flexDirection: 'column', marginLeft: '40px', fontFamily: 'Times-Bold' }}>

                                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                                            <View style={{marginLeft:'20px', marginRight:'10px'}}>
                                                <Image src='/cu_logo.png' style={{
                                                    height: '65px',
                                                    width: '50px',
                                                }} />
                                            </View>


                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', width: '280px', marginRight: '10px' }}>
                                                <Text style={{ textAlign: 'left' }}>University of Chittagong</Text>
                                                <Text style={{ textAlign: 'left' }}>Faculty of Engineering</Text>
                                                <Text style={{ textAlign: 'left' }}>Department of Computer Science & Enginerring</Text>
                                                <Text style={{ textAlign: 'left' }}>{`${formatOrdinals(semester)} Semester BSc Engineering Examination ${session}`}</Text>
                                                <Text style={{ textAlign: 'left' }}>Held in: {monthsArray[startMonth]} - {monthsArray[endMonth]} {dayjs(examInfo.start_date).year()}</Text>
                                                <Text style={{ textAlign: 'left' }}>Grade Sheet</Text>
                                            </View>
                                        </View>

                                        <View style={{ display: "flex", flexDirection: 'column', fontSize: '12px', marginLeft: '20px' }}>
                                            <View style={{display:'flex', flexDirection:'row'}}>
                                                <Text style={{marginRight:'6.7px'}}>Serial No. </Text>
                                                <Text> :  R{idx + 1}</Text>
                                            </View>

                                            <View style={{display:'flex', flexDirection:'row'}}>
                                                <Text style={{marginRight:'4px'}}>Student ID</Text>
                                                <Text> :  {student[1][0].roll}</Text>
                                            </View>
                                            
                                            <View style={{display:'flex', flexDirection:'row'}}>
                                                <Text style={{marginRight:'30.5px'}}>Name</Text>
                                                <Text> :  {student[1][0].name}</Text>
                                            </View>
                                            
                                            <View style={{display:'flex', flexDirection:'row'}}>
                                                <Text style={{marginRight:'38.5px'}}>Hall</Text>
                                                <Text> :  {student[1][0].hall}</Text>
                                            </View>

                                            <View style={{display:'flex', flexDirection:'row'}}>
                                                <Text style={{marginRight:'23.3px'}}>Session</Text>
                                                <Text> :  {stud_session - 1} - {stud_session}</Text>
                                            </View>

                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', border: 1, flexDirection: 'column', fontSize: '12px', width: '40%', height: '160px', marginRight: '50px', marginLeft: 'auto' }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '60%', textAlign: 'center', borderRight: 1, fontFamily: "Times-Bold" }}>Numerical Grade</Text>
                                            <Text style={{ width: '20%', textAlign: 'center', borderRight: 1, fontFamily: "Times-Bold" }}>letter Grade</Text>
                                            <Text style={{ textAlign: 'center', width: '20%', fontFamily: "Times-Bold" }}>Grade Point</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
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

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
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

                                <View style={{ borderTop: 1, borderRight: 1, borderLeft: 1, marginTop: '10px', width: '732px', marginLeft: '60px', flexDirection: 'column' }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', fontFamily: 'Times-Bold', fontSize: '12px' }}>
                                        <Text style={{ textAlign: 'center', borderRight: 1, borderBottom: 1, width: '15%' }}>Course Code</Text>
                                        <Text style={{ textAlign: 'center', borderRight: 1, borderBottom: 1, width: '40%' }}>Course Title</Text>
                                        <Text style={{ textAlign: 'center', borderRight: 1, borderBottom: 1, width: '10%' }}>Credits</Text>
                                        <Text style={{ textAlign: 'center', borderRight: 1, borderBottom: 1, width: '15%' }}>Letter Grade</Text>
                                        <Text style={{ textAlign: 'center', borderRight: 1, borderBottom: 1, width: '15%' }}>Grade Point</Text>
                                        <Text style={{ textAlign: 'center', borderBottom: 1, width: '15%' }}>Credit Points</Text>
                                    </View>
                                    {
                                        student[1].map((item, idx) => {
                                            const grade = letterGrade((item.total / item.max_mark) * 100)
                                            tco += item.course_credit;
                                            tce += (gradePoint(grade).toFixed(2) >= 2.00 ? item.course_credit : 0);
                                            tcp += item.course_credit * gradePoint(grade);
                                            return (
                                                <View key={idx} style={{ display: 'flex', flexDirection: 'row', fontSize: '12px' }}>
                                                    <Text style={{ textAlign: 'center', borderRight: 1, borderBottom: 1, width: '15%', fontFamily: 'Times-Bold' }}>{item.course_code}</Text>
                                                    <Text style={{ textAlign: 'left', borderRight: 1, borderBottom: 1, width: '40%', paddingLeft: '5px' }}>{item.course_name}</Text>
                                                    <Text style={{ textAlign: 'center', borderRight: 1, borderBottom: 1, width: '10%', fontFamily: 'Times-Bold' }}>{item.course_credit}</Text>
                                                    <Text style={{ textAlign: 'center', borderRight: 1, borderBottom: 1, width: '15%', fontFamily: 'Times-Bold' }}>{grade}</Text>
                                                    <Text style={{ textAlign: 'center', borderRight: 1, borderBottom: 1, width: '15%', fontFamily: 'Times-Bold' }}>{gradePoint(grade).toFixed(2)}</Text>
                                                    <Text style={{ textAlign: 'center', borderBottom: 1, width: '15%', fontFamily: 'Times-Bold' }}>{(item.course_credit * gradePoint(grade)).toFixed(2)}</Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', marginLeft: '60px' }}>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ marginRight: '20px', fontFamily: 'Times-Bold' }}>Total Credit Offered : {tco.toFixed(2)}</Text>

                                        <Text>Total Credit Earned : </Text>
                                        <Text style={{ fontFamily: 'Times-Bold' }}>{tce.toFixed(2)}</Text>

                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Text style={{ marginRight: '29px', fontFamily: 'Times-Bold' }}>Total Credit Point : {tcp.toFixed(2)}</Text>
                                        <Text > Grade Point Average:</Text>
                                        <Text style={{ marginRight: '31px', fontFamily: 'Times-Bold' }}> {(tcp != 0 && tce != 0) ? (tcp / tce).toFixed(2) : '0.00'} </Text>
                                        <Text style={{ fontFamily: 'Times-Bold' }}>Result: {(tcp / tce) != Infinity && (tcp / tce) != 0 ? 'P' : 'F'}</Text>
                                    </View>
                                </View>

                                {
                                    (() => {
                                        tco = 0
                                        tcp = 0
                                        tce = 0
                                    })()
                                }

                                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 'auto', matginBottom: '30px', fontSize: '12px', marginLeft: '58px' }}>
                                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Text style={{ fontFamily: 'Times-Bold' }}> Publication Date..................</Text>
                                        <Text style={{ fontFamily: 'Times-Bold', marginTop: '10px' }}> Issue Date............................</Text>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', marginLeft: '90px' }}>
                                        <Text style={{ fontFamily: 'Times-Bold' }}> Prepared by............................................</Text>
                                        <Text style={{ fontFamily: 'Times-Bold', marginTop: '10px' }}> Compared by..........................................</Text>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', marginLeft: '90px' }}>
                                        <Text > .............................................................</Text>
                                        <Text style={{ fontFamily: 'Times-Bold', paddingLeft: '30px' }}> Controller of Examinations</Text>
                                        <Text style={{ fontFamily: 'Times-Bold', paddingLeft: '40px' }}>University Of chittagong</Text>
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