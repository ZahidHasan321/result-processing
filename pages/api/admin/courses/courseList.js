import pool from "@/lib/db";

export default async function handler(req, res) {

    const query = {
        text: 'SELECT course_code, course_name, course_credit, course_type, max_mark FROM courses WHERE semester = $1',
        values: [req.body]
    }
    await pool.query(query)
        .then(data => res.status(200).send(data.rows))
        .catch(err => res.status(500).send(err))
}
