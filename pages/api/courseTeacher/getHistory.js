import pool from "@/lib/db";

export default async function handler(req, res) {

const query = {
    text: 'SELECT exam_session, course_name, courses.course_code, courses.semester, course_type, course_teacher.submit_date, course_teacher.assigned_date FROM course_teacher JOIN courses ON course_teacher.course_code = courses.course_code WHERE id = ($1)::uuid AND submitted = true',
    values: [req.body]
}
    const result = await pool.query(query)
    .then(data => data.rows)
    .catch(err => console.log(err));
    res.status(200).send(result);
}