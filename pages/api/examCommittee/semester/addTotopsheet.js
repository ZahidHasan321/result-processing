import pool from "@/lib/db";
import format from "pg-format";

export default async function handler(req, res) {
    const param = req.body;

    param.map((item) => {
        const query = {
            text: 'INSERT INTO topsheet(exam_session, course_code, type, set, code) VALUES ($1::int, $2, $3, $4, $5::int) ON CONFLICT DO NOTHING',
            values: Object.values(item)
        }
        pool.query(query)
            .catch(err => console.log(err))
    })

    var set;
    if(param != null || param != undefined){
        if (param[0].set === 'A')
            set = 'set_a'
        else
            set = 'set_b'
        await pool.query(`UPDATE sem_course SET ${set} = true WHERE course_code = $1::text AND exam_session = $2::int`, [param[0].course, param[0].session])
    }
    res.status(200).json('ok');
}
