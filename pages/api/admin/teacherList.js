import pool from "@/lib/db";

export default async function handler(req, res) {
  const result = await pool.query('SELECT * FROM users')
  .then(res => res.rows);

  res.send(result);
}
