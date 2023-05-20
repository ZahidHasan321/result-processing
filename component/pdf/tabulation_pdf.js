import React, { useState } from 'react';
import { Page, Text, View, Document, Font, Image } from '@react-pdf/renderer';
import styles from './styles';
import logo from "../../public/Cu_logo.jpg"
import { formatOrdinals } from '@/helper/ordinal';

Font.register({ family: 'Times-Roman' });

// Create Document Component
const TabulationPDF = ({ semester, session, courseList, memberList }) => {
    let totalCredit = 0

    return (
        <Document >
            <Page size="A4" style={styles.page} orientation="landscape">
                <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View style={{ display: 'flex', flexDirection: 'column', fontSize: '8px', alignContent: 'center', width: '140px', marginRight: '10px' }}>
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
                            <Image src={logo} style={{ height: '50px' }} />
                            <Text style={{ textAlign: 'center' }}>University of Chittagong</Text>
                            <Text style={{ textAlign: 'center' }}>Faculty of Engineering</Text>
                            <Text style={{ textAlign: 'center' }}>Department of Computer Science & Enginerring</Text>
                            <Text style={{ textAlign: 'center' }}>{`${formatOrdinals(semester)} Semester BSc Engineering Examination ${session}`}</Text>
                            <Text style={{ textAlign: 'center' }}>Held in: September - November 2021</Text>
                            <Text style={{ textAlign: 'center' }}>Tabulation Sheet</Text>
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'column', border: 1, fontSize: '8px', width: '250px', height:'100px' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }}>
                                <Text style={{ textAlign: 'center', textDecoration: 'underline', fontFamily: 'Times-Bold', width: '20%', borderRight: 1 }}>Course No.</Text>
                                <Text style={{ textAlign: 'center', textDecoration: 'underline', fontFamily: 'Times-Bold', width: '70%', borderRight: 1 }}>Course Title</Text>
                                <Text style={{ textAlign: 'center', textDecoration: 'underline', fontFamily: 'Times-Bold', width: '10%' }}>Credit</Text>
                            </View>

                            {
                                courseList && courseList.map((course, idx) => {
                                    totalCredit = totalCredit + course.course_credit
                                    return (
                                        <View style={{ display: 'flex', flexDirection: 'row', borderBottom: 1 }} key={idx}>
                                            <Text style={{ textAlign: 'center', fontFamily: 'Times-Roman', width: '20%', borderRight: 1 }}>{course.course_code}</Text>
                                            <Text style={{ textAlign: 'center', fontFamily: 'Times-Roman', width: '70%', borderRight: 1 }}>{course.course_name}</Text>
                                            <Text style={{ textAlign: 'center', fontFamily: 'Times-Roman', width: '10%' }}>{course.course_credit}</Text>
                                        </View>)
                                })
                            }


                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={{ textAlign: 'center', width: '20%', borderRight: 1 }}></Text>
                                <Text style={{ textAlign: 'center', width: '70%', borderRight: 1 }}>{`Total Credits Offered(TCO):`}</Text>
                                <Text style={{ textAlign: 'center',  width: '10%' }}>{totalCredit}</Text>
                            </View>

                        </View>

                    </View>

                    <View>
                        <Text>Table</Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <View style={{ display: 'flex', flexDirection: 'column', fontSize: '8px', marginRight: '180px' }}>
                            <Text style={{ fontFamily: "Times-Bold", marginBottom: '20px' }} >Tabulator</Text>

                            {
                                memberList && memberList.map((member, idx) => {
                                    if (member.role === 'Tabulator') {
                                        return (
                                            <Text style={{ marginBottom: '10px' }}>{`${idx + 1}. ${member.name} ............................`}</Text>
                                        )
                                    }
                                })
                            }
                        </View>

                        <View style={{ display: 'flex', flexDirection: 'column', fontSize: '8px', marginRight: '180px' }}>
                            <Text style={{ fontFamily: "Times-Bold", marginBottom: '20px' }} >Exam Committee</Text>

                            {
                                memberList && memberList.map((member, idx) => {
                                    return (
                                        <Text style={{ marginBottom: '10px' }}>{`${idx + 1}. ${member.name} ............................`}</Text>
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
        </Document>
    )
};

export default TabulationPDF