import pool from "@/lib/db";

export default async function handler(req, res) {
const param = req.body;

const query = {
    text: 'SELECT code FROM topsheet Where exam_session = $1 AND course_code = $2::text AND set = $3::text AND type = $4 ORDER BY code',
    values: [param.session, param.course, param.set, "present"]
}
    const result = await pool.query(query)
    .then(data => data.rows)
    .catch(err => console.log(err));
    res.status(200).send(result);
}