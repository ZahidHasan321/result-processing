import pool from "@/lib/db";

export default async function handler(req, res) {
  const result = await pool.query('SELECT id, email, name, phone, department FROM users WHERE role = $1', ['Teacher'])
  .then(res => res.rows);

  res.send(result);
}
