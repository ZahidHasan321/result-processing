import pool from "@/lib/db";

export default async function handler(req, res) {
    const {session, course } = req.body
const query = {
    text: `SELECT student.roll, name, ct, attendance FROM catm_marks 
    JOIN student ON catm_marks.roll = student.roll 
    WHERE exam_session = $1 AND course_code = $2 ORDER BY catm_marks.roll`,
    values: [session, course]
}
    const result = await pool.query(query)
    .then(data => data.rows)
    .catch(err => console.log(err));
    res.status(200).send(result);
}