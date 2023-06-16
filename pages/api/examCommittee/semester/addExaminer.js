import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;

    const client = await pool.connect()

    try {
        await client.query('BEGIN');
        const query = {
            text: `INSERT INTO examiner(id, exam_session, course_code, set_number, assigned_date) 
                    VALUES (($1)::uuid, $2, $3, $4, CURRENT_DATE) ON CONFLICT (exam_session, course_code, set_number)
                    DO UPDATE SET id = $1, assigned_date = CURRENT_DATE`,
            values: [param.id, param.session, param.course, param.set]
        }

        await client.query(query)
            .catch(err => { throw err })

        var temp = 'examiner_a';
        if (param.set === 'B') temp = 'examiner_b'

        const query2 = {
            text: `UPDATE sem_course SET ${temp} = ($1)::uuid WHERE exam_session = $2 AND course_code = $3`,
            values: [param.id, param.session, param.course]
        }

        await client.query(query2)
            .catch(err => { throw err })

        res.status(200).send({ message: 'Examiner Assigned' })
        await client.query('COMMIT')
    }
    catch (e) {
        await client.query('ROLLBACK')
        res.status(500).send({ message: 'Cannot assign examiner' });
        throw e
    }
    finally {
        client.release()
    }
}