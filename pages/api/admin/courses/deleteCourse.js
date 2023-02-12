import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;
    console.log(param)
    const query = {
        text: 'DELETE FROM course WHERE course_code = $1::int',
        values: [param]
    }
    const result = await pool.query(query)
        .then(res => res.rows)
        .catch(err => err)
    res.send(result);
}
