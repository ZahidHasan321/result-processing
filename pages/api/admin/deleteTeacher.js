import pool from "@/lib/db";

export default async function handler(req, res) {
    const query = { 
        text: 'DELETE FROM users WHERE id = ($1)::uuid',
        values: [req.body]
    }
  
  const result = await pool.query(query)
  .then(res => res.rows)
  .then(err => err);

  res.send(result);
}
