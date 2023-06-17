import pool from "@/lib/db";

export default async function (req, res) {
    const param = req.body;

    if (param.session == '' || param.semester == '' || isNaN(param.session)) {
        res.status(505).send({message: "session or semester can't be empty"});
        return;
    }
    else {
        const client = await pool.connect();
        try {
            await client.query('BEGIN')
            const text = 'INSERT INTO exam_committee(id, semester, exam_session, role, assigned_date) VALUES($1, $2, $3, $4, CURRENT_DATE)'

            if (param.member1 != null) {
                await client.query(text, [param.member1.id, param.semester, param.session, param.role1 || 'Member'])
            }

            if (param.member2 != null) {
                await client.query(text, [param.member2.id, param.semester, param.session, param.role2 || 'Member'])
            }


            if (param.member3 != null) {
                await client.query(text, [param.member3.id, param.semester, param.session, param.role3 || 'Member'])
            }

            if (param.member4 != null) {
                await client.query(text, [param.member4.id, param.semester, param.session,param.role4 || 'Member'])

            }
            if (param.member5 != null) {
                await client.query(text, [param.member5.id, param.semester, param.session, param.role5 || 'Member'])
            }

            await client.query(
                {
                    text: 'SELECT insert_into_sem_course($1, $2)',
                    values: [param.semester, param.session]
                }
            )
            
            await client.query(
                {
                    text: 'INSERT INTO exam_info(exam_session, semester) VALUES($1, $2) ',
                    values: [param.session, param.semester]
                }
            )

            await client.query(
                {
                    text:`INSERT INTO summation_sheet(exam_session, course_code, roll, code_a, mark_a, code_b, mark_b, catm)
                    (
                        SELECT s.exam_session+1, s.course_code, s.roll, code_a, mark_a, code_b, mark_b, catm FROM summation_sheet s
                        JOIN courses c
                        ON s.course_code = c.course_code
                        WHERE exam_session = $1 AND semester = $2 AND roll IN (
                            SELECT roll FROM stud_per_session
                            WHERE exam_session = $3 AND semester = $2 AND improve = true
                        )
                    )`,
                    values:[param.session-1, param.semester, param.session]
                }
            )

            

            await client.query(
                {
                    text:`INSERT INTO summation_sheet (roll, course_code, exam_session)
                    (SELECT roll, course_code, s.exam_session
                    FROM stud_per_session s JOIN 
                    courses c
					ON 
                    s.semester = c.semester
                    WHERE s.semester = $2 AND
                    s.exam_session = $1)
                    ON CONFLICT DO NOTHING`,
                    values:[param.session, param.semester]
                }
            )

            
            await client.query('COMMIT')
            res.status(200).send({ message: 'Committee Created' })
            
        }
        catch (e) {
            await client.query('ROLLBACK')
            res.status(500).send({ message: 'Could not create committee' });
            throw e
        } 
        finally {
            client.release()
        }
    }

}