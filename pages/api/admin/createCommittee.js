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
            const text = 'INSERT INTO exam_committee(id, semester, exam_session, role) VALUES($1, $2, $3, $4)'

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
            ).catch(err => console.log(err));
            
            await client.query(
                {
                    text: 'INSERT INTO exam_info(exam_session, semester) VALUES($1, $2) ',
                    values: [param.session, param.semester]
                }
            ).catch(err => console.log(err));

            await client.query(
                {
                    text:`INSERT INTO summation_sheet (roll, course_code)
                    SELECT s.roll, c.course_code
                    FROM stud_per_session s JOIN 
                    courses c
                    s.exam_session = $1 AND
                    c.semester = $2`
                }
            )

            await client.query('COMMIT')
            res.status(200).send({ message: 'Committee Created' })
            
        }
        catch (e) {
            await client.query('ROLLBACK')
            res.status(500).send({ message: 'Couldnot create committee' });
            throw e
        } 
        finally {
            client.release()
        }
    }

}