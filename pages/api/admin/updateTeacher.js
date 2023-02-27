import pool from "@/lib/db";

export default async function handler(req, res) {
  const param = req.body
  const query = {
    text: 'UPDATE users SET email = $1, name = $2, phone = $3, department = $4 WHERE id = $5',
    values: [param.email, param.name, param.phone, param.dept, param.id]
  }

  const result = await pool.query(query)
    .catch(err => err);

  if(result.severity == 'ERROR')
    res.status(500).send(result);
  else
    res.status(200).send(result)
}
