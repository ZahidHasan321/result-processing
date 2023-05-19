import pool from "@/lib/db";

export default async function handler(req, res) {

  const query = {
    text: 'UPDATE exam_committee SET role = $1 WHERE id = ($2)::uuid AND exam_session = $3::int AND semester = $4::int',
    values: Object.values(req.body)
  }

  const result = await pool.query(query)
    .catch(err => err);

  console.log(result)
  if(result.severity == 'ERROR')
    res.status(500).send(result);
  else
    res.status(200).send(result)
}
