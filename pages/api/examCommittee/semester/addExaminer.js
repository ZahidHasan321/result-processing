import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;
    const query = {
        text: 'INSERT INTO examiner(id, exam_session, course_code, set) VALUES ($1, $2, $3, $4) RETURNING id',
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
                        text: 'UPDATE sem_course SET assigned = true, examiners = ARRAY_APPEND(examiners, $1::text) WHERE exam_session = $2::int AND course_code = $3::text',
                        values: [examiner.rows[0].name, param.session, param.course]
                    }
                    
                    pool.query(query2)
                    .then(result => console.log(result))
                    .catch(err => console.log(err))
                })
                .catch(err =>  console.log(err))
                
            }
            res.status(200).send(data.rows)
        }
        )
        .catch(err => res.status(500).send(err));




}