import React, { useState } from 'react';
import { Page, Text, View, Document, Font, Image } from '@react-pdf/renderer';
import styles from './styles';
import { formatOrdinals } from '@/helper/ordinal';
import dayjs from 'dayjs';

let monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

Font.register({ family: 'Times-Roman' });

// Create Document Component
const TabulationPDF = ({ semester, session, courseList, memberList, tabularData, studentID, examInfo }) => {
    let totalCredit = 0
    let pageNumber = Math.ceil(tabularData.length / 3)
    let labNumber = 0
    let labNumber2 = 0
    let looper = []
    for (let i = 0; i < pageNumber; i++) {
        looper.push(i)
    }

    let tabulatorCounter = 0;
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
                looper.map((loop, idx) => {
                    return (
                        <Page key={idx} size="A3" style={styles.page} orientation="landscape">
                            <View style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <View style={{ display: 'flex', flexDirection: 'column', fontSize: '10px', alignContent: 'center', width: '180px', marginRight: '20px', marginLeft: '50px' }}>
                                        <Text style={{ fontFamily: "Times-Bold", borderBottom: '3px', textAlign: 'center' }}>ABBREVIATIONS</Text>
                                        <Text>LG = Letter Grade</Text>
                                        <Text>GP = Grade Points </Text>
                                        <Text>CT = Class Test</Text>
                                        <Text>FEM = Final Exam Marks</Text>
                                        <Text>MO = Marks Obtained</Text>
                                        <Text>CP = Credit Points = Credit x GP </Text>
                                        <Text>TCE = Total Credit Earned</Text>
                                        <Text>TCP = Total Credit Points</Text>
                                        <Text>TCO = Total Credits Offered</Text>, borderTop:1
                                        <Text>GPA=Grade Point Average=TCP/TCO </Text>
                                    </View>

                                    <View style={{ display: 'flex', border: 1, flexDirection: 'column', fontSize: '10px', width: '160px', marginRight: '20px' }}>
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

                                    <View style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', width: '280px', marginRight: '20px' }}>
                                        <Image src='/cu_logo.png' style={{
                                            alignContent: 'center',
                                            alignSelf: 'center',
                                            height: '50px',
                                            width: '35px',
                                        }} />

                                        <Text style={{ textAlign: 'center' }}>University of Chittagong</Text>
                                        <Text style={{ textAlign: 'center' }}>Faculty of Engineering</Text>
                                        <Text style={{ textAlign: 'center' }}>Department of Computer Science & Enginerring</Text>
                                        <Text style={{ textAlign: 'center' }}>{`${formatOrdinals(semester)} Semester BSc Engineering Examination ${session}`}</Text>
                                        <Text style={{ textAlign: 'center' }}>Held in: { startMonth === endMonth ? monthsArray[startMonth] : `${monthsArray[startMonth]} - ${monthsArray[endMonth]}`} {dayjs(examInfo.start_date).year()}</Text>
                                        <Text style={{ textAlign: 'center' }}>Tabulation Sheet</Text>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', borderTop: 1, fontSize: '10px', width: '400px' }}>
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
                                                        <Text style={{ textAlign: 'left', fontFamily: 'Times-Roman', width: '70%', borderRight: 1, paddingLeft: '2px' }}>{course.course_name}</Text>
                                                        <Text style={{ textAlign: 'center', fontFamily: 'Times-Roman', width: '10%', borderRight: 1 }}>{course.course_credit}</Text>
                                                    </View>)
                                            })
                                        }


                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                            <Text style={{ textAlign: 'center', width: '20%', borderRight: 1, borderLeft: 1 }}></Text>
                                            <Text style={{ textAlign: 'left', width: '70%', borderRight: 1, paddingLeft: '2px' }}>{`Total Credits Offered(TCO):`}</Text>
                                            <Text style={{ textAlign: 'center', width: '10%', borderRight: 1 }}>{totalCredit}</Text>
                                        </View>

                                    </View>

                                </View>

                                {
                                    //Table starts here
                                }

                                <View style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', width: '1080px', marginLeft: '50px', marginBottom: '10px', marginTop: '10px' }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: '-28px' }}>
                                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Text style={{ border: 1, borderBottom: 0, height: '14px', ...styles.verticalText }}>Serial No.</Text>
                                            <Text style={{ border: 1, borderBottom: 0, height: '27px', marginLeft: '-66.2px', ...styles.verticalText }}>Hall</Text>
                                            <Text style={{ border: 1, borderBottom: 0, height: '14px', marginLeft: '-53.2px', ...styles.verticalText }}>Student ID</Text>
                                            <Text style={{ border: 1, borderBottom: 0, height: '27px', paddingLeft: '3px', paddingRight: '3px', marginLeft: '-66.2px', ...styles.verticalText }}>Student Name</Text>
                                            <Text style={{ border: 1, borderBottom: 0, height: '14px', marginLeft: '-53.2px', ...styles.verticalText }}>Session</Text>
                                            <Text style={{ border: 1, borderBottom: 0, height: '14px', marginLeft: '-66.2px', ...styles.verticalText }}></Text>
                                        </View>

                                        {
                                            courseList && courseList.map((course, idx) => {

                                                if (course.course_type == 'Theory') {
                                                    return (
                                                        <View key={idx} style={{ display: 'flex', borderTop: 1, flexDirection: 'column', fontSize: '12px', marginLeft: `${idx == 0 ? '-66.2px' : '-27.3px'}` }}>
                                                            <View style={{ borderLeft: `${idx == 0 ? 1 : 0}`, marginLeft: `${idx == 0 ? '' : '1px'}`, display: 'flex', flexDirection: 'column', }}>
                                                                <Text style={{  ...styles.hText }}>{course.course_code}</Text>
                                                                <Text style={{ paddingTop: '3px', paddingBottom: '3.2px', ...styles.hText }}>{`${course.max_mark ? course.max_mark : 0} Marks`}</Text>
                                                            </View>
                                                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                                <Text style={{ borderTop: 1, borderBottom: 1, borderLeft: 1, height: '18.2px', ...styles.vTextNP }}>CATM</Text>
                                                                <Text style={{ borderBottom: 1, marginLeft: "-27.6px", borderLeft: 1, height: '18.2px', ...styles.vTextNP }}>FEM</Text>
                                                                <Text style={{ borderBottom: 1, marginLeft: "-27.6px", borderLeft: 1, height: '18.2px', ...styles.vTextNP }}>MO</Text>
                                                                <Text style={{ borderBottom: 1, marginLeft: "-27.6px", borderLeft: 1, height: '18.2px', ...styles.vTextNP }}>LG</Text>
                                                                <Text style={{ borderBottom: 1, marginLeft: "-27.6px", borderLeft: 1, height: '18.2px', ...styles.vTextNP }}>CP</Text>
                                                            </View>
                                                        </View>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <View key={idx} style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', marginLeft: `${labNumber == 0 ? `${idx === 0 ? '-86px' : '-46.2px' }` : '-24.2px'}` }}>
                                                            <View style={{ borderLeft:`${idx === 0 ? 1 : 0}`, display: 'flex', borderTop: 1, flexDirection: 'column', marginLeft: `${labNumber == 0 ? '20px' : '-2.2px'}` }}>
                                                                <Text style={{ ...styles.hText2}}>{course.course_code}</Text>
                                                                <Text style={{ ...styles.hText2, paddingTop: '3px', paddingBottom: '3.2px' }}>{`${course.max_mark ? course.max_mark : 0} Marks`}</Text>
                                                            </View>

                                                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                                <Text style={{ borderTop:`${idx === 0 ? 1 : 0}`,borderBottom: 1, borderLeft: 1,height:'18.2px ', marginLeft: `${labNumber++ == 0 ? '20px' : '-2.2px'}`, ...styles.vTextNP }}>MO</Text>
                                                                <Text style={{ borderBottom: 1, marginLeft: "-27.6px",height:'18.2px ', borderLeft: 1, ...styles.vTextNP }}>LG</Text>
                                                                <Text style={{ borderBottom: 1, marginLeft: "-27.6px",height:'18.2px ', borderLeft: 1, ...styles.vTextNP }}>CP</Text>
                                                            </View>,

                                                        </View>
                                                    )
                                                }
                                            })
                                        }

                                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                                            <Text style={{paddingTop:'1px', borderBottom: 1, borderLeft: 1, height: '18.2px', marginLeft: '-26.6px', ...styles.verticalText }}>TCE</Text>
                                            <Text style={{paddingTop:'1px', borderBottom: 1, borderLeft: 1, borderRight: 1, height: '18.2px', marginLeft: '-62px', ...styles.verticalText }}>TCP</Text>
                                            <Text style={{paddingTop:'1px', borderBottom: 1, borderLeft: 1, borderRight: 1, height: '18.2px', marginLeft: '-62px', ...styles.verticalText }}>GPA</Text>
                                            <Text style={{paddingTop:'1px', borderBottom: 1, borderLeft: 1, borderRight: 1, height: '18.2px', marginLeft: '-62px', ...styles.verticalText }}>Result</Text>
                                            <Text style={{paddingTop:'1px', borderBottom: 1, borderLeft: 1, borderRight: 1, height: '18.2px', marginLeft: '-62px', ...styles.verticalText }}>Remark</Text>
                                        </View>
                                    </View>

                                    {
                                        Array(3).fill(1).map((dummy, idx1) => {

                                            let id = Array.isArray(tabularData) && String(Array.isArray(tabularData[it]) && tabularData[it][0]).substring(0, 2);
                                            let stud_session = '20' + id;

                                            stud_session = Number(stud_session);

                                            return (
                                                <View key={idx1} style={{ display: 'flex', flexDirection: 'row', marginBottom: '-28px' }}>
                                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <Text style={{ border: 1, borderBottom: 0, borderRight: 0, height: '14px', ...styles.verticalText3, fontFamily: 'Times-Bold' }}>{it + 1}</Text>
                                                        <Text style={{ border: 1, borderBottom: 0, borderRight: 0, height: '27px', marginLeft: '-81.2px', ...styles.verticalText3 }}>{it <= tabularData.length && Array.isArray(tabularData[it]) ? tabularData[it][1][0].hall : ''}</Text>
                                                        <Text style={{ border: 1, borderBottom: 0, borderRight: 0, height: '14px', marginLeft: '-68.2px', ...styles.verticalText3 }}>{it <= tabularData.length && Array.isArray(tabularData[it]) ? tabularData[it][1][0].roll : ''}</Text>
                                                        <Text style={{ border: 1, borderBottom: 0, borderRight: 0, height: '27px', marginLeft: '-81.2px', ...styles.verticalText3 }}>{it <= tabularData.length && Array.isArray(tabularData[it]) ? tabularData[it][1][0].name : ''}</Text>
                                                        <Text style={{ border: 1, borderBottom: 0, borderRight: 0, height: '14px', marginLeft: '-68.2px', ...styles.verticalText3 }}>{it <= tabularData.length && Array.isArray(tabularData[it]) ? `${stud_session - 1}-${stud_session}` : ''}</Text>
                                                        <View style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', marginTop: '11px' }}>
                                                            <Text style={{ border: 1, borderBottom: 0, borderRight: 0, marginLeft: '-81.2px', ...styles.vTextNP2 }}>Regular</Text>
                                                            <Text style={{ border: 1, borderBottom: 0, borderRight: 0, marginLeft: '-81.2px', ...styles.vTextNP22 }}>Improve</Text>
                                                        </View>

                                                        {

                                                            courseList && tabularData && courseList.map((course, idx3) => {

                                                                const obj = tabularData.length && Array.isArray(tabularData[it]) ? tabularData[it][1].find(x => x.course_code == course.course_code) : []

                                                                const grade = letterGrade(course.max_mark > 0 ? (obj.total / course.max_mark) * 100 : 0);
                                                                const point = (gradePoint(grade) * course.course_credit)
                                                                improve = obj.improve
                                                                tcp = tcp + point
                                                                tce = tce + (point > 0 ? course.course_credit : 0)

                                                                if (course.course_type == 'Theory') {
                                                                    return (
                                                                        <View key={idx3} style={{ display: 'flex', flexDirection: 'row', marginBottom: '-21px' }}>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', marginTop: '24px', marginLeft: `${idx3 == 0 ? '-67.4px' : '-29.8px'}` }}>
                                                                                <Text style={{ borderTop:`${idx3 === 0 ? 1 : 0}`, borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>{obj.improve ? '' : obj.catm}</Text>
                                                                                <Text style={{ borderTop:`${idx3 === 0 ? 1 : 0}`,borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '28.8px' }}>{obj.improve ? obj.catm : ''}</Text>
                                                                            </View>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', marginTop: '24px', marginLeft: `-30.1px` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>{obj.improve ? '' : obj.fem}</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '28.8px' }}>{obj.improve ? obj.fem : ''}</Text>
                                                                            </View>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', marginTop: '24px', marginLeft: `-30.1px` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>{obj.improve ? '' : obj.total}</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '28.8px' }}>{obj.improve ? obj.total : ''}</Text>
                                                                            </View>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', marginTop: '24px', marginLeft: `-30.1px` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>{obj.improve ? '' : grade}</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '28.8px' }}>{obj.improve ? grade : ''}</Text>
                                                                            </View>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', marginTop: '24px', marginLeft: `-30.1px` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>{obj.improve ? '' : Array.isArray(tabularData[it]) && point.toFixed(2)}</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '28.8px' }}>{obj.improve && Array.isArray(tabularData[it]) ? point.toFixed(2) : ''}</Text>
                                                                            </View>
                                                                        </View>
                                                                    )
                                                                }
                                                                else if (course.course_type == 'Lab') {
                                                                    return (
                                                                        <View key={idx3} style={{ display: 'flex', flexDirection: 'row', marginBottom: '-21px' }}>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', marginTop: '24px', marginLeft: `${idx3 == 0 ? '-67.2px' : '-28.9px'}` }}>
                                                                                <Text style={{borderTop: `${idx3 === 0 ? 1 : 0}`, borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>{obj.improve ? '' : obj.total}</Text>
                                                                                <Text style={{borderTop: `${idx3 === 0 ? 1 : 0}`, borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '28.8px' }}>{obj.improve ? obj.catm : ''}</Text>
                                                                            </View>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', marginTop: '24px', marginLeft: `-30px` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>{obj.improve ? '' : grade}</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '28.8px' }}>{obj.improve ? grade : ''}</Text>
                                                                            </View>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', marginTop: '24px', marginLeft: `${labNumber2++ === 0 ? '-30px' : '-30.2px'}` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>{obj.improve ? '' : Array.isArray(tabularData[it]) && point.toFixed(2)}</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '28.8px' }}>{obj.improve && Array.isArray(tabularData[it]) ? point.toFixed(2) : ''}</Text>
                                                                            </View>
                                                                        </View>
                                                                    )
                                                                }

                                                            })

                                                        }



                                                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: '-21px' }}>
                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', marginTop: '24px', marginLeft: `-29.1px` }}>
                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP4, marginTop: '24px' }}>{improve ? '' : Array.isArray(tabularData[it]) && tce}</Text>
                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP4, marginTop: '28.8px' }}>{improve && Array.isArray(tabularData[it]) ? tce : ''} </Text>
                                                            </View>

                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', marginTop: '24px', marginLeft: `-29.1px` }}>
                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP4, marginTop: '24px' }}>{improve ? '' : Array.isArray(tabularData[it]) && tcp.toFixed(2)}</Text>
                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP4, marginTop: '28.8px' }}>{improve && Array.isArray(tabularData[it]) ? tcp.toFixed(2) : ''}</Text>
                                                            </View>

                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', marginTop: '24px', marginLeft: `-29.1px` }}>
                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP4, marginTop: '24px' }}>{improve ? '' : ((tce / tcp) !== (tce / tcp) ? Array.isArray(tabularData[it]) && 0.00 : Array.isArray(tabularData[it]) && (tce / tcp).toFixed(2))}</Text>
                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP4, marginTop: '28.8px' }}>{improve && Array.isArray(tabularData[it]) ? ((tce / tcp) !== (tce / tcp) ? Array.isArray(tabularData[it]) && 0.00 : Array.isArray(tabularData[it]) && (tce / tcp).toFixed(2)) : ''}</Text>
                                                            </View>

                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', marginTop: '24px', marginLeft: `-29.1px` }}>
                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP4, marginTop: '24px' }}>{improve ? '' : ((tce / tcp) > 2.20 ? Array.isArray(tabularData[it]) && 'P' : Array.isArray(tabularData[it]) && 'F')}</Text>
                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP4, marginTop: '28.8px' }}>{improve && Array.isArray(tabularData[it]) ? ((tce / tcp) > 2.20 ? Array.isArray(tabularData[it]) && 'P' : Array.isArray(tabularData[it]) && 'F') : ''}</Text>
                                                            </View>{(tce / tcp) > 2.20 ? 'P' : 'F'}

                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '12px', marginTop: '24px', marginLeft: `-29.1px` }}>
                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP4, marginTop: '24px' }}></Text>
                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP4, marginTop: '28.8px' }}></Text>
                                                            </View>
                                                        </View>
                                                    </View>

                                                    {
                                                        (() => {
                                                            it++
                                                            tcp = 0
                                                            tce = 0
                                                            labNumber2 = 0
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

                                <View style={{ display: 'flex', flexDirection: 'row', marginTop: '10px', marginLeft: '50px', justifyContent: 'space-between' }}>
                                    <View style={{ display: 'flex', flexDirection: 'column', fontSize: '10px' }}>
                                        <Text style={{ fontFamily: "Times-Bold", marginBottom: '20px' }} >Tabulator</Text>

                                        {

                                            memberList &&
                                            memberList.map((member, idx) => {
                                                if (member.role === 'Tabulator' || member.role === 'Chairman') {
                                                    return (
                                                        <Text key={idx} style={{ marginBottom: '15px' }}>{`${++tabulatorCounter}. ${member.name} ............................`}</Text>
                                                    )
                                                }
                                            })
                                        }
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', fontSize: '10px' }}>
                                        <Text style={{ fontFamily: "Times-Bold", marginBottom: '20px' }} >Examination Committee</Text>

                                        {
                                            memberList && memberList.map((member, idx) => {
                                                let role = 'Member'
                                                if (member.role == 'Chairman') role = 'Chairman'
                                                return (
                                                    <Text key={idx} style={{ marginBottom: '15px' }}>{`${idx + 1}. ${member.name} (${role}) ............................`}</Text>
                                                )
                                            })
                                        }
                                    </View>

                                    {
                                        (() => {
                                            tabulatorCounter = 0
                                        })()
                                    }

                                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', fontSize: '10px', marginRight: '60px' }}>
                                        <Text style={{ marginBottom: '35px', paddingTop: '5x' }}>Result Published on ..........................</Text>
                                        <Text style={{ marginLeft: 'auto', paddingRight: '10px' }}>Controller of Examinations</Text>
                                        <Text style={{ marginLeft: 'auto', paddingRight: '15px' }} >University of Chittagong</Text>
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