import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;
    
    const query = {
        text: 'SELECT sem_course.course_code, course_name, catm, submitted_a, submitted_b, decoded_a, decoded_b, set_a, set_b, u1.name AS examiner_a_name, u2.name AS examiner_b_name FROM sem_course JOIN courses ON sem_course.course_code = courses.course_code LEFT JOIN users u1 ON sem_course.examiner_a = u1.id LEFT JOIN users u2 ON sem_course.examiner_b = u2.id  WHERE courses.semester = $1 AND exam_session = $2 ORDER By sem_course.course_code',
        values: [param.semester, param.session]
    }

    const result = await pool.query(query)
        .then(data => {res.status(200).send(data.rows)})
        .catch(err => console.log(err))
}
