import pool from "@/lib/db";

export default async function handler(req, res) {

    const query = {
        text: 'SELECT course_code, course_name, course_credit, type FROM course WHERE semester = $1',
        values: [req.body]
    }
    const result = await pool.query(query)
        .then(res => res.rows)
        .catch(err => err)
    res.send(result);
}
