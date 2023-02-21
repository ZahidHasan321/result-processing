import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;


    const query = {
        text: 'DELETE FROM topsheet WHERE exam_session = $1::int AND course_code = $2 AND set = $3 AND type = $4 AND code = $5::int',
        values: Object.values(param)
    }
    const result = await pool.query(query)
        .then(data => res.rows)
        .catch(err => err)
    
    res.send(200).send(result);
}
