import pool from "@/lib/db";
import format from "pg-format";

export default async function handler(req, res) {
    const param = req.body;

    const client = await pool.connect()

    try {
        await client.query('BEGIN');

        param.map(async (item) => {
            const query = {
                text: 'INSERT INTO topsheet(exam_session, course_code, type, set, code) VALUES ($1::int, $2, $3, $4, $5::int) ON CONFLICT DO NOTHING',
                values: Object.values(item)
            }
            await client.query(query)
        })
        var set;
        if (param != null || param != undefined) {
            if (param[0].set === 'A')
                set = 'set_a'
            else
                set = 'set_b'
            await client.query(`UPDATE sem_course SET ${set} = true WHERE course_code = $1::text AND exam_session = $2::int`, [param[0].course, param[0].session])
        }

        await client.query('COMMIT');
        res.status(200).send({children:'Submitted successfully', severity:'success'})
    }
    catch(e){
        await client.query('ROLLBACK');
        res.status(200).send({children:'Error while submitting', severity:'error'})
        throw e;
    }
    finally{
        client.release()
    }
}
