import pool from "@/lib/db";

export default async function handler(req, res) {
    var param = req.body;
    const query = { 
        text: 'SELECT users.id, users.name, users.email, exam_committee.role, phone, department FROM users JOIN exam_committee ON users.id = exam_committee.id WHERE semester = $2::int AND exam_session = $1::int',
        values: [param.session, param.semester]
    }
  
  const result = await pool.query(query)
  .then(res => res.rows)

  res.status(200).send(result);
}
