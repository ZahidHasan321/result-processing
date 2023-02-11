import pool from "@/lib/db";

export default async function handler(req, res) {
  const result = await pool.query('SELECT DISTINCT exam_session FROM exam_committee')
  .then(res => res.rows);
  res.send(result);
}
