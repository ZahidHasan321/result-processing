import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;
    const query = {
        text: 'DELETE FROM courses WHERE course_code = $1::text',
        values: [param]
    }
    await pool.query(query)
    .then(data => res.status(200).send(data.rows))
    .catch(err => res.status(500).send(err))
}
