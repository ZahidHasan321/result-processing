import React, { useState } from 'react';
import { Page, Text, View, Document, Font, Image } from '@react-pdf/renderer';
import styles from './styles';
import { formatOrdinals } from '@/helper/ordinal';

Font.register({ family: 'Times-Roman' });

// Create Document Component
const TabulationPDF = ({ semester, session, courseList, memberList, tabularData, studentID }) => {
    let totalCredit = 0
    let pageNumber = Math.ceil(studentID.length / 3)
    let labNumber = 0
    let looper = []
    for (let i = 0; i < pageNumber; i++) {
        looper.push(i)
    }

    let it = 0
    let tcp = 0
    let tce = 0
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
                looper.map((loop, idx) => {
                    return (
                        <Page key={idx} size="A4" style={styles.page} orientation="landscape">
                            <View style={{ display: 'flex', flexDirection: 'column' }}>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <View style={{ display: 'flex', flexDirection: 'column', fontSize: '8px', alignContent: 'center', width: '140px', marginRight: '10px', marginLeft: '30px' }}>
                                        <Text style={{ fontFamily: "Times-Bold", borderBottom: '3px', textAlign: 'center' }}>ABBREVIATIONS</Text>
                                        <Text>LG = Letter Grade</Text>
                                        <Text>GP = Grade Points </Text>
                                        <Text>CT = Class Test</Text>
                                        <Text>FEM = Final Exam Marks</Text>
                                        <Text>MO = Marks Obtained</Text>
                                        <Text>CP = Credit Points = Credit x GP </Text>
                                        <Text>TCE = Total Credit Earned</Text>
                                        <Text>TCP = Total Credit Points</Text>
                                        <Text>TCO = Total Credits Offered</Text>
                                        <Text>GPA=Grade Point Average=TCP/TCO </Text>
                                    </View>

                                    <View style={{ display: 'flex', border: 1, flexDirection: 'column', fontSize: '8px', width: '120px', marginRight: '10px' }}>
                                        <Text style={{ textAlign: 'center', borderBottom: 1, fontFamily: "Times-Bold" }}>GRADING SYSTEM</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '70%', textAlign: 'center', borderRight: 1, fontFamily: "Times-Bold" }}>MO</Text>
                                            <Text style={{ width: '15%', textAlign: 'center', borderRight: 1, fontFamily: "Times-Bold" }}>LG</Text>
                                            <Text style={{ textAlign: 'center', width: '15%', fontFamily: "Times-Bold" }}>GP</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '70%', textAlign: 'center', borderRight: 1 }}>80% to 100%</Text>
                                            <Text style={{ width: '15%', textAlign: 'center', borderRight: 1 }}>A+</Text>
                                            <Text style={{ textAlign: 'center', width: '15%' }}>4.00</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '70%', textAlign: 'center', borderRight: 1 }}>{'75% to <80%'}</Text>
                                            <Text style={{ width: '15%', textAlign: 'center', borderRight: 1 }}>A</Text>
                                            <Text style={{ textAlign: 'center', width: '15%' }}>3.75</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '70%', textAlign: 'center', borderRight: 1 }}>{'70% to <75%'}</Text>
                                            <Text style={{ width: '15%', textAlign: 'center', borderRight: 1 }}>A-</Text>
                                            <Text style={{ textAlign: 'center', width: '15%' }}>3.50</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '70%', textAlign: 'center', borderRight: 1 }}>{'65% to <70%'}</Text>
                                            <Text style={{ width: '15%', textAlign: 'center', borderRight: 1 }}>B+</Text>
                                            <Text style={{ textAlign: 'center', width: '15%' }}>3.25</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '70%', textAlign: 'center', borderRight: 1 }}>{'60% to <65%'}</Text>
                                            <Text style={{ width: '15%', textAlign: 'center', borderRight: 1 }}>B</Text>
                                            <Text style={{ textAlign: 'center', width: '15%' }}>3.00</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '70%', textAlign: 'center', borderRight: 1 }}>{'55% to <60%'}</Text>
                                            <Text style={{ width: '15%', textAlign: 'center', borderRight: 1 }}>B-</Text>
                                            <Text style={{ textAlign: 'center', width: '15%' }}>2.75</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '70%', textAlign: 'center', borderRight: 1 }}>{'50% to <55%'}</Text>
                                            <Text style={{ width: '15%', textAlign: 'center', borderRight: 1 }}>C+</Text>
                                            <Text style={{ textAlign: 'center', width: '15%' }}>2.50</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '70%', textAlign: 'center', borderRight: 1 }}>{'45% to <50%'}</Text>
                                            <Text style={{ width: '15%', textAlign: 'center', borderRight: 1 }}>C</Text>
                                            <Text style={{ textAlign: 'center', width: '15%' }}>2.25</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ width: '70%', textAlign: 'center', borderRight: 1 }}>{'40% to <45%'}</Text>
                                            <Text style={{ width: '15%', textAlign: 'center', borderRight: 1 }}>D</Text>
                                            <Text style={{ textAlign: 'center', width: '15%' }}>2.00</Text>
                                        </View>

                                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Text style={{ width: '70%', textAlign: 'center', borderRight: 1 }}>{'0% to <40% '}</Text>
                                            <Text style={{ width: '15%', textAlign: 'center', borderRight: 1 }}>F</Text>
                                            <Text style={{ textAlign: 'center', width: '15%' }}>0.00</Text>
                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', fontSize: '10px', width: '230px', marginRight: '10px' }}>
                                        <Image src='/Cu_logo.jpg' style={{
                                            height: '50px',
                                            width: '46px',
                                        }} />
                                        <Text style={{ textAlign: 'center' }}>University of Chittagong</Text>
                                        <Text style={{ textAlign: 'center' }}>Faculty of Engineering</Text>
                                        <Text style={{ textAlign: 'center' }}>Department of Computer Science & Enginerring</Text>
                                        <Text style={{ textAlign: 'center' }}>{`${formatOrdinals(semester)} Semester BSc Engineering Examination ${session}`}</Text>
                                        <Text style={{ textAlign: 'center' }}>Held in: September - November 2021</Text>
                                        <Text style={{ textAlign: 'center' }}>Tabulation Sheet</Text>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', borderTop: 1, fontSize: '8px', width: '250px' }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ textAlign: 'center', textDecoration: 'underline', fontFamily: 'Times-Bold', width: '20%', borderRight: 1, borderLeft: 1 }}>Course No.</Text>
                                            <Text style={{ textAlign: 'center', textDecoration: 'underline', fontFamily: 'Times-Bold', width: '70%', borderRight: 1 }}>Course Title</Text>
                                            <Text style={{ textAlign: 'center', textDecoration: 'underline', fontFamily: 'Times-Bold', width: '10%', borderRight: 1 }}>Credit</Text>
                                        </View>

                                        {
                                            courseList && courseList.map((course, idx) => {
                                                totalCredit = totalCredit + course.course_credit
                                                return (
                                                    <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }} key={idx}>
                                                        <Text style={{ textAlign: 'center', fontFamily: 'Times-Roman', width: '20%', borderRight: 1, borderLeft: 1 }}>{course.course_code}</Text>
                                                        <Text style={{ textAlign: 'center', fontFamily: 'Times-Roman', width: '70%', borderRight: 1 }}>{course.course_name}</Text>
                                                        <Text style={{ textAlign: 'center', fontFamily: 'Times-Roman', width: '10%', borderRight: 1 }}>{course.course_credit}</Text>
                                                    </View>)
                                            })
                                        }


                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ textAlign: 'center', width: '20%', borderRight: 1, borderLeft: 1 }}></Text>
                                            <Text style={{ textAlign: 'center', width: '70%', borderRight: 1 }}>{`Total Credits Offered(TCO):`}</Text>
                                            <Text style={{ textAlign: 'center', width: '10%', borderRight: 1 }}>{totalCredit}</Text>
                                        </View>

                                    </View>

                                </View>

                                {
                                    //Table starts here
                                }

                                <View style={{ border: 1, display: 'flex', flexDirection: 'column', fontSize: '9px', width: '770px', marginLeft: '30px', marginBottom: '10px', marginTop: '10px' }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: '-21px' }}>
                                        <Text style={{ borderBottom: 1, borderLeft: 1, height: '12px', ...styles.verticalText }}>Serial No.</Text>
                                        <Text style={{ borderBottom: 1, borderLeft: 1, height: '20px', marginLeft: '-58px', ...styles.verticalText }}>Hall</Text>
                                        <Text style={{ borderBottom: 1, borderLeft: 1, height: '12px', marginLeft: '-50px', ...styles.verticalText }}>Student ID</Text>
                                        <Text style={{ borderBottom: 1, borderLeft: 1, height: '20px', marginLeft: '-58px', ...styles.verticalText }}>Name</Text>
                                        <Text style={{ borderBottom: 1, borderLeft: 1, height: '12px', marginLeft: '-50px', ...styles.verticalText }}>Session</Text>
                                        <Text style={{ borderBottom: 1, borderLeft: 1, height: '12px', marginLeft: '-60px', ...styles.verticalText }}></Text>

                                        {
                                            courseList && courseList.map((course, idx) => {

                                                if (course.course_type == 'Theory') {
                                                    return (
                                                        <View key={idx} style={{ display: 'flex', flexDirection: 'column', marginLeft: `${idx == 0 ? '-58px' : '-33px'}` }}>
                                                            <View style={{ display: 'flex', flexDirection: 'column' }}>
                                                                <Text style={{ paddingLeft: '3px', paddingRight: '3px', ...styles.hText }}>{course.course_code}</Text>
                                                                <Text style={{ padding: '2px', ...styles.hText }}>{`${course.max_mark ? course.max_mark : 0} Marks`}</Text>
                                                            </View>
                                                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                                <Text style={{ borderBottom: 1, borderLeft: 1, height: '11px', ...styles.vTextNP }}>CATM</Text>
                                                                <Text style={{ borderBottom: 1, marginLeft: "-33px", borderLeft: 1, height: '11px', ...styles.vTextNP }}>FEM</Text>
                                                                <Text style={{ borderBottom: 1, marginLeft: "-33px", borderLeft: 1, height: '11px', ...styles.vTextNP }}>MO</Text>
                                                                <Text style={{ borderBottom: 1, marginLeft: "-33px", borderLeft: 1, height: '11px', ...styles.vTextNP }}>LG</Text>
                                                                <Text style={{ borderBottom: 1, marginLeft: "-33px", borderLeft: 1, height: '11px', ...styles.vTextNP }}>CP</Text>
                                                            </View>
                                                        </View>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <View key={idx} style={{ display: 'flex', flexDirection: 'column', marginLeft: `${labNumber == 0 ? '-53px' : '-30px'}` }}>
                                                            <View style={{ display: 'flex', flexDirection: 'column', marginLeft: `${labNumber == 0 ? '20px' : '-3px'}`, fontSize: '7px' }}>
                                                                <Text style={{ ...styles.hText2, paddingTop: '1px', paddingBottom: '1.2px' }}>{course.course_code}</Text>
                                                                <Text style={{ ...styles.hText2, paddingTop: '3px', paddingBottom: '3.2px' }}>{`${course.max_mark ? course.max_mark : 0} Marks`}</Text>
                                                            </View>

                                                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                                <Text style={{ borderBottom: 1, borderLeft: 1, marginLeft: `${labNumber++ == 0 ? '20px' : '-3px'}`, ...styles.vTextNP }}>MO</Text>
                                                                <Text style={{ borderBottom: 1, marginLeft: "-33px", borderLeft: 1, ...styles.vTextNP }}>LG</Text>
                                                                <Text style={{ borderBottom: 1, marginLeft: "-33px", borderLeft: 1, ...styles.vTextNP }}>CP</Text>
                                                            </View>,

                                                        </View>
                                                    )
                                                }
                                            })
                                        }

                                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Text style={{ borderBottom: 1, borderLeft: 1, height: '11px', marginLeft: '-33px', ...styles.verticalText }}>TCE</Text>
                                            <Text style={{ borderBottom: 1, borderLeft: 1, height: '11px', marginLeft: '-60px', ...styles.verticalText }}>TCP</Text>
                                            <Text style={{ borderBottom: 1, borderLeft: 1, height: '11px', marginLeft: '-60px', ...styles.verticalText }}>GPA</Text>
                                            <Text style={{ borderBottom: 1, borderLeft: 1, height: '11px', marginLeft: '-60px', ...styles.verticalText }}>Result</Text>
                                            <Text style={{ borderBottom: 1, borderLeft: 1, height: '11px', marginLeft: '-60px', ...styles.verticalText }}>Remark</Text>
                                        </View>
                                    </View>

                                    {
                                        Array(3).fill(1).map((dummy, idx1) => {

                                            return (
                                                <View key={idx1} style={{ display: 'flex', flexDirection: 'row', marginBottom: '-21px' }}>
                                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <Text style={{ borderBottom: 1, borderLeft: 1, height: '12px', ...styles.verticalText, fontFamily: 'Times-Bold' }}>{it + 1}</Text>
                                                        <Text style={{ borderBottom: 1, borderLeft: 1, height: '20px', marginLeft: '-58px', ...styles.verticalText }}>{it <= studentID.length ? studentID[it].hall : 'Hall'}</Text>
                                                        <Text style={{ borderBottom: 1, borderLeft: 1, height: '12px', marginLeft: '-50px', ...styles.verticalText }}>{it <= studentID.length ? studentID[it].roll : 'Student ID'}</Text>
                                                        <Text style={{ borderBottom: 1, borderLeft: 1, height: '20px', marginLeft: '-58px', ...styles.verticalText }}>{it <= studentID.length ? studentID[it].name : 'Name'}</Text>
                                                        <Text style={{ borderBottom: 1, borderLeft: 1, height: '12px', marginLeft: '-50px', ...styles.verticalText }}>{it <= studentID.length ? `${studentID[it].session - 1}-${studentID[it].session}` : 'Session'}</Text>
                                                        <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px' }}>
                                                            <Text style={{ borderBottom: 1, borderLeft: 1, marginLeft: '-58px', ...styles.vTextNP2 }}>Regular</Text>
                                                            <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, marginLeft: '-58px', ...styles.vTextNP2 }}>Improve</Text>
                                                        </View>



                                                        {
                                    
                                                            courseList && tabularData && courseList.map((course, idx3) => {

                                                                const obj = tabularData.length ? tabularData[it][1].find(x => x.course_code == course.course_code) : []

                                                                const grade = letterGrade((obj.total / course.max_mark) * 100)
                                                                const point = (gradePoint(grade) * course.course_credit)
                                                                improve = obj.improve
                                                                tcp = tcp + point
                                                                tce = tce + (point > 0 ? course.course_credit : 0)
            
                                                                if (course.course_type == 'Theory') {
                                                                    return (
                                                                        <View key={idx3} style={{ display: 'flex', flexDirection: 'row', marginBottom: '-21px' }}>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `${idx3 == 0 ? '-48px' : '-24.7px'}` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>{obj.improve ? '' : obj.catm}</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP3, marginTop: '23px' }}>{obj.improve ? obj.catm : ''}</Text>
                                                                            </View>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `-24.7px` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>{obj.improve ? '' : obj.fem}</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP3, marginTop: '23px' }}>{obj.improve ? obj.fem : ''}</Text>
                                                                            </View>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `-24.7px` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>{obj.improve ? '' : obj.total}</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP3, marginTop: '23px' }}>{obj.improve ? obj.total : ''}</Text>
                                                                            </View>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `-24.7px` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>{obj.improve ? '' : grade}</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP3, marginTop: '23px' }}>{obj.improve ? grade : ''}</Text>
                                                                            </View>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `-24.7px` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>{obj.improve ? '' : point.toFixed(2)}</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP3, marginTop: '23px' }}>{obj.improve ? point.toFixed(2) : ''}</Text>
                                                                            </View>
                                                                        </View>
                                                                    )
                                                                }
                                                                else if (course.course_type == 'Lab') {
                                                                    return (
                                                                        <View key={idx3} style={{ display: 'flex', flexDirection: 'row', marginBottom: '-21px' }}>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `${idx3 == 0 ? '-48px' : '-24.7px'}` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>{obj.improve ? '' : obj.total}</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP3, marginTop: '23px' }}>{obj.improve ? obj.catm : ''}</Text>
                                                                            </View>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `-24.7px` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>{obj.improve ? '' : grade}</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP3, marginTop: '23px' }}>{obj.improve ? grade : ''}</Text>
                                                                            </View>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `-24.7px` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>{obj.improve ? '' : point.toFixed(2)}</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP3, marginTop: '23px' }}>{obj.improve ? point.toFixed(2) : ''}</Text>
                                                                            </View>
                                                                        </View>
                                                                    )
                                                                }

                                                            })

                                                        }



                                                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: '-21px'  }}>
                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `-24.7px` }}>
                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP4, marginTop: '24px' }}>{improve ? '' : tce}</Text>
                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP4, marginTop: '23px' }}>{improve ? tce : ''} </Text>
                                                            </View>

                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `-24px` }}>
                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP4, marginTop: '24px' }}>{improve ? '' :tcp.toFixed(2)}</Text>
                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP4, marginTop: '23px' }}>{improve ? tcp.toFixed(2) : ''}</Text>
                                                            </View>

                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `-24px` }}>
                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP4, marginTop: '24px' }}>{improve ? '' :((tce / tcp) !== (tce / tcp)? 0.00 : (tce / tcp).toFixed(2))}</Text>
                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP4, marginTop: '23px' }}>{improve ? ((tce / tcp) !== (tce / tcp) ? 0.00 : (tce / tcp).toFixed(2) ): ''}</Text>
                                                            </View>

                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `-24px` }}>
                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP4, marginTop: '24px' }}>{improve ? '' : ((tce / tcp) > 2.20 ? 'P' : 'F')}</Text>
                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP4, marginTop: '23px' }}>{improve ? ((tce / tcp) > 2.20 ? 'P' : 'F') : ''}</Text>
                                                            </View>{(tce / tcp) > 2.20 ? 'P' : 'F'}

                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `-24px` }}>
                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP4, marginTop: '24px' }}></Text>
                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP4, marginTop: '23px' }}></Text>
                                                            </View>
                                                        </View>
                                                    </View>

                                                    {
                                                        (() => {
                                                            it++
                                                            tcp = 0
                                                            tce = 0
                                                        })()
                                                    }


                                                </View>
                                            )
                                        })
                                    }
                                </View>

                                {
                                    //Table Ends Here
                                }

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

export default TabulationPDF