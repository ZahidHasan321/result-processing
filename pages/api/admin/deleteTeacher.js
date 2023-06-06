import pool from "@/lib/db";

export default async function handler(req, res) {
  const query = {
    text: 'DELETE FROM users WHERE id = ($1)::uuid',
    values: [req.body]
  }

 await pool.query(query)
    .then(() => res.status(200).send({message:'Teacher Deleted', status:'success'}))
    .then(()=>  res.status(200).send({message:'Could not delete', status:'error'}));

}
