import pool from "@/lib/db";

export default async function handler(req, res) {
    const query = { 
        text: 'SELECT DISTINCT semester FROM exam_committee WHERE exam_session = $1::int',
        values: [req.body]
    }
  
  const result = await pool.query(query)
  .then(res => res.rows)
  .then(err => err);
  res.send(result);
}
