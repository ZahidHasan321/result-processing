import pool from "@/lib/db";

export default async function handler(req, res) {
var param = req.body;
if(param == ""){
    param = null;
}
const query = {
    text: 'SELECT * FROM exam_committee c JOIN exam_info i ON c.exam_session = i.exam_session AND c.semester = i.semester WHERE id = ($1)::uuid AND published = true',
    values: [req.body]
}
  const result = await pool.query(query)
    .then(data => data.rows)
    .catch(err => err);
    res.send(result);
}