import pool from "@/lib/db";

export default async function handler(req, res) {
    const { session, semester } = req.body;
    const query = {
        text: 'SELECT exam_session, examiner.course_code,semester, course_name ,set_number, submit_date FROM examiner JOIN courses ON courses.course_code = examiner.course_code WHERE exam_session = $1 AND semester = $2 AND submitted = true AND decoded = false',
        values: [session, semester]
    }
    const result = await pool.query(query)
        .then(data => data.rows)
        .catch(err => console.log(err));

    res.status(200).send(result);
}