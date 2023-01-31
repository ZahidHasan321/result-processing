// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import pool from "@/lib/db";

export default async function handler(req, res) {
  const result = await pool.query('SELECT * FROM users where email = $1 and password = $2', ['admin@admin.com', 'admin']).then(data => res.send(data.rows));
   
}
