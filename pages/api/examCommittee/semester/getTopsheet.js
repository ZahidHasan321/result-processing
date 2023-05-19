import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;


    const query = {
        text: 'SELECT code AS roll FROM topsheet WHERE exam_session = $1::int AND course_code = $2 AND set = $3 AND type = $4',
        values: Object.values(param)
    }
    const result = await pool.query(query)
        .then(data => data.rows)
        .catch(err => console.log(err))
        
        res.status(200).send(result);
}
