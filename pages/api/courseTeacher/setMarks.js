import pool from "@/lib/db";

export default async function handler(req, res) {
    const { marks, session, course } = req.body


    const client = await pool.connect();

    try {
        await client.query('BEGIN')

        marks.map(async (item) => {
            await client.query({
                text: 'INSERT INTO catm_marks VALUES($1, $2, $3, $4, $5) ON CONFLICT (exam_session, course_code, roll) DO UPDATE SET ct = $3, attendance = $4',
                values: [session, course, item.ct, item.attendance, item.roll]
            })
        })

        const query2 = {
            text: 'UPDATE sem_course SET catm = true WHERE exam_session = $1 AND course_code = $2',
            values: [session, course]
        }
        await client.query(query2)

        const query3 = {
            text: 'UPDATE course_teacher SET submitted = true, submit_date = CURRENT_DATE WHERE exam_session = $1 AND course_code = $2',
            values: [session, course]
        }
        await client.query(query3)

        await client.query('COMMIT')
        res.status(200).send({ children: 'Successfully submitted', severity: 'success' })

    }

    catch (e) {
        await client.query('ROLLBACK')
        res.status(500).send({ children: 'Error while submitting', severity: 'error' })
        throw e
    }
    finally {
        client.release()
    }
}