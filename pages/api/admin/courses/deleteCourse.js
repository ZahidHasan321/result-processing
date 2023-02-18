import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;
    console.log(param)
    const query = {
        text: 'DELETE FROM course WHERE course_code = $1::text',
        values: [param]
    }
    await pool.query(query)
    .then(data => res.status(200).send(data.rows))
    .catch(err => res.status(500).send(err))
}
