import React, { useState } from 'react';
import { Page, Text, View, Document, Font, Image } from '@react-pdf/renderer';
import styles from './styles';
import logo from "../../public/Cu_logo.jpg"
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
                                        <Image src={logo} style={{ height: '50px' }} />
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
                                            <Text style={{ borderBottom: 1, borderLeft: 1, height: '12px', marginLeft: '-33px', ...styles.verticalText }}>TCE</Text>
                                            <Text style={{ borderBottom: 1, borderLeft: 1, height: '12px', marginLeft: '-58px', ...styles.verticalText }}>TCP</Text>
                                            <Text style={{ borderBottom: 1, borderLeft: 1, height: '12px', marginLeft: '-58px', ...styles.verticalText }}>GPA</Text>
                                            <Text style={{ borderBottom: 1, borderLeft: 1, height: '12px', marginLeft: '-58px', ...styles.verticalText }}>Result</Text>
                                            <Text style={{ borderBottom: 1, borderLeft: 1, height: '12px', marginLeft: '-58px', ...styles.verticalText }}>Remark</Text>
                                        </View>
                                    </View>





                                    {
                                        Array(3).fill(1).map((dummy, idx1) => {
                                            let x = 1
                                            return (
                                                <View key={idx1} style={{ display: 'flex', flexDirection: 'row', marginBottom: '-21px' }}>
                                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <Text style={{ borderBottom: 1, borderLeft: 1, height: '12px', ...styles.verticalText }}>Serial No.</Text>
                                                        <Text style={{ borderBottom: 1, borderLeft: 1, height: '20px', marginLeft: '-58px', ...styles.verticalText }}>Hall</Text>
                                                        <Text style={{ borderBottom: 1, borderLeft: 1, height: '12px', marginLeft: '-50px', ...styles.verticalText }}>Student ID</Text>
                                                        <Text style={{ borderBottom: 1, borderLeft: 1, height: '20px', marginLeft: '-58px', ...styles.verticalText }}>Name</Text>
                                                        <Text style={{ borderBottom: 1, borderLeft: 1, height: '12px', marginLeft: '-50px', ...styles.verticalText }}>Session</Text>
                                                        <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px' }}>
                                                            <Text style={{ borderBottom: 1, borderLeft: 1, marginLeft: '-58px', ...styles.vTextNP2 }}>Regular</Text>
                                                            <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, marginLeft: '-58px', ...styles.vTextNP2 }}>Improve</Text>
                                                        </View>



                                                        {
                                                            courseList && courseList.map((course, idx3) => {
                                                                if (course.course_type == 'Theory') {
                                                                    return (
                                                                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: '-21px' }}>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `${idx3 == 0 ? '-48px' : '-24.7px'}` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>A+</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP3, marginTop: '23px' }}>19.5</Text>
                                                                            </View>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `-24.7px` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>A+</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP3, marginTop: '23px' }}>19.5</Text>
                                                                            </View>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `-24.7px` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>A+</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP3, marginTop: '23px' }}>19.5</Text>
                                                                            </View>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `-24.7px` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>A+</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP3, marginTop: '23px' }}>19.5</Text>
                                                                            </View>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `-24.7px` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>A+</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP3, marginTop: '23px' }}>19.5</Text>
                                                                            </View>
                                                                        </View>
                                                                    )
                                                                }
                                                                else {
                                                                    return (
                                                                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: '-21px' }}>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `${idx3 == 0 ? '-48px' : '-24.7px'}` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>A+</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP3, marginTop: '23px' }}>19.5</Text>
                                                                            </View>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `-24.7px` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>A+</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP3, marginTop: '23px' }}>19.5</Text>
                                                                            </View>
                                                                            <View style={{ display: 'flex', flexDirection: 'column', fontSize: '7px', marginTop: '11px', marginLeft: `-24.7px` }}>
                                                                                <Text style={{ borderBottom: 1, borderLeft: 1, ...styles.vTextNP3, marginTop: '24px' }}>A+</Text>
                                                                                <Text style={{ borderBottom: 1, borderLeft: `${idx1 == 2 ? 0 : 1}`, ...styles.vTextNP3, marginTop: '23px' }}>19.5</Text>
                                                                            </View>
                                                                        </View>
                                                                    )
                                                                }

                                                            })
                                                        }

                                                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                            <Text style={{ borderBottom: 1, borderLeft: 1, height: '12px', marginLeft: '-24.7px', ...styles.verticalText }}>TCE</Text>
                                                            <Text style={{ borderBottom: 1, borderLeft: 1, height: '12px', marginLeft: '-58px', ...styles.verticalText }}>TCP</Text>
                                                            <Text style={{ borderBottom: 1, borderLeft: 1, height: '12px', marginLeft: '-58px', ...styles.verticalText }}>GPA</Text>
                                                            <Text style={{ borderBottom: 1, borderLeft: 1, height: '12px', marginLeft: '-58px', ...styles.verticalText }}>Result</Text>
                                                            <Text style={{ borderBottom: 1, borderLeft: 1, height: '12px', marginLeft: '-58px', ...styles.verticalText }}>Remark</Text>
                                                        </View>
                                                    </View>

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