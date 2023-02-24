import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;
    const query = {
        text: 'INSERT INTO examiner(id, exam_session, course_code, set_number) VALUES (($1)::uuid, $2, $3, $4) ON CONFLICT ON CONSTRAINT examiner_unq '
            + 'DO UPDATE SET id = examiner.id RETURNING id',
        values: [param.id, param.session, param.course, param.set]
    }

    await pool.query(query)
        .then(data => {
            if (data.rows.length > 0) {
                const query1 = {
                    text: 'SELECT name FROM users WHERE id = $1',
                    values: [data.rows[0].id]
                }

                pool.query(query1)
                    .then(examiner => {
                        const query2 = {
                            text: 'UPDATE sem_course SET assigned = true,examiners[$1::int] = $2::text WHERE exam_session = $3::int AND course_code = $4::text',
                            values: [param.number, examiner.rows[0].name, param.session, param.course]
                        }

                        pool.query(query2)
                            .catch(err => console.log("Already exists"))
                    })
                    .catch(err => console.log("No such user found"))

            }
            res.status(200).send({messege:'updated'})
        }
        )
        .catch(err => res.status(500).send(err));

}