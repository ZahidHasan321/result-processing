import pool from "@/lib/db";

export default async function handler(req, res) {

const query = {
    text: 'SELECT * FROM exam_committee WHERE id = ($1)::uuid AND published = false',
    values: [req.body]
}
  const result = await pool.query(query)
    .then(data => data.rows)
    .catch(err => err);
    res.send(result);
}