import pool from "@/lib/db";

export default async function handler(req, res) {
    const { marks, session, course, set } = req.body;
    const client = await pool.connect()

    try {
        await client.query('BEGIN');

        marks.map((item => {
            Object.entries(item).forEach(async([key, value]) => {
                if (value != null && value !=='' && key != 'code' && key != 'Total' && item.code) {
                    const query = {
                        text: `INSERT INTO marks VALUES ($1::int, $2::text, $3::text, $4::int, $5::text, $6::numeric) 
                        ON CONFLICT (exam_session, course_code, set, paper_code, question)
                        DO UPDATE SET mark = $6`,
                        values: [session, course, set, item.code,key, value.trim()]
                    }
                    await client.query(query);
                }
            })
        }))

        var paperset = (set === 'A') ? 'submitted_a' : 'submitted_b';

        const query1 = {
            text: 'UPDATE examiner SET submitted = true, submit_date = CURRENT_DATE WHERE exam_session = $1 AND course_code = $2 AND set_number = $3',
            values: [session, course, set]
        }
        await client.query(query1)


        const query2 = {
            text: `UPDATE sem_course SET ${paperset}= true WHERE exam_session = $1 AND course_code = $2`,
            values: [session, course]
        }
        await client.query(query2)

        await client.query('COMMIT');
        res.status(200).send({ children: 'Successfully submitted', severity: 'success' })
    }
    catch (e) {
        await client.query('ROLLBACK');
        console.log(e)
        res.status(500).send({ children: 'Error while submitting', severity: 'error' })
        throw e;
    }
    finally {
        client.release();
    }
}