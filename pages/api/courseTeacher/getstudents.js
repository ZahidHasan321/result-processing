import pool from "@/lib/db";

export default async function handler(req, res) {
    const { session, semester } = req.body
    const query = {
        text: 'SELECT * FROM student JOIN stud_per_session ON student.roll = stud_per_session.roll WHERE exam_session = $1 AND semester = $2',
        values: [session, semester]
    }
    const result = await pool.query(query)
        .then(data => data.rows)
        .catch(err => console.log(err));
    res.status(200).send(result);
}