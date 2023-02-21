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

    res.status(200).json('ok');
}
