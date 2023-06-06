
import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;

    const query = {
        text: `UPDATE users SET password = $1 WHERE id = $2`,
        values: [param.password, param.id]
    }
   
    await pool.query(query)
    .then(() => {res.status(200).send({message:'Password updated', status:'success'})})
    .catch(() => res.status(500).send({message:'Failed to update password', status:'error'}))
}
