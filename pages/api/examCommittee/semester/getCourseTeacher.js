import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;
    const query = {
        text: 'SELECT users.id, email, name, phone, department FROM course_teacher JOIN users ON users.id = course_teacher.id WHERE exam_session = $1 AND course_code = $2',
        values: [param.session, param.course]
    }
    const result = await pool.query(query)
        .then(data => res.status(200).send(data.rows))
        .catch(err => console.log(err));
}

