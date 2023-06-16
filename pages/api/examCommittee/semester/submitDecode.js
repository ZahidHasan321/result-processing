import pool from "@/lib/db";

export default async function handler(req, res) {

    const { marks, session, course, set } = req.body;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        marks.map(async (item) => {
            var total = 0;
            var f = true;
            Object.entries(item).forEach(([key, value]) => {
                if (value != null && !isNaN(value) && value !== '' && key != 'roll' && key != 'code' && key != 'Total') {
                    total = total + (+value);
                    f = false;
                }
            })

            if (total === 0 && f || isNaN(total)) total = null;

            if (item.roll != null && item.roll !== '') {
                const query = {
                    text: `INSERT INTO stud_mark VALUES($1, $2, $3, $4, $5, $6) 
                    ON CONFLICT(exam_session, course_code, set, code) 
                    DO UPDATE set roll = $5, total = $6`,
                    values: [session, course, set, item.code, item.roll, total]
                }

                await client.query(query)
            }
        })


        const set_no = (set === 'A' ? 'decoded_a' : 'decoded_b');

        const query2 = {
            text: `UPDATE sem_course SET ${set_no} = true WHERE exam_session = $1 AND course_code = $2`,
            values: [session, course]
        }
        await client.query(query2)


        const query3 = {
            text: 'UPDATE examiner SET decoded = true, decode_date = CURRENT_DATE WHERE exam_session = $1 AND course_code = $2 AND set_number = $3',
            values: [session, course, set]
        }
        await client.query(query3)

        await client.query('COMMIT');

        res.status(200).send({ children: 'Successfully submitted', severity: 'success' });
    }
    catch (e) {
        await client.query('ROLLBACK');
        res.status(500).send({ children: 'Error while submitting', severity: 'error' });
        console.log(e)
    }
    finally {
        client.release()
    }
}