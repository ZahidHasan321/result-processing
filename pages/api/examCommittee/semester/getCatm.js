import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;

    const query = {
        text: `SELECT exam_session, course_name, courses.course_code, courses.semester, course_type, course_teacher.submit_date, course_teacher.assigned_date 
        FROM course_teacher JOIN courses 
        ON course_teacher.course_code = courses.course_code 
        WHERE exam_session = $1 AND semester = $2 AND submitted = true`,
        values: [param.session, param.semester]
    }

    await pool.query(query)
        .then(data => { res.status(200).send(data.rows) })
        .catch(err => console.log(err))
}
