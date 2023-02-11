import pool from "@/lib/db";

export default async function handler(req, res) {
var param = req.body;
if(param == ""){
    param = null;
}
const query = {
    text: 'SELECT * FROM exam_committee WHERE id = ($1)::uuid AND published = true',
    values: [req.body]
}
  const result = await pool.query(query)
    .then(data => data.rows)
    .catch(err => err);
    res.send(result);
}