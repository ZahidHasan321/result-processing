import pool from "@/lib/db";

export default async function handler(req, res) {
    console.log(req.body)
    const query = {
        text: 'DELETE FROM student WHERE roll = $1',
        values: [req.body.id]
    }

    const result = await pool.query(query)
        .then(ressponse => res.status(200).send({message:'Deleted student', status:'Success'}) )
        .catch(err => res.status(500).send({message:'Could not delete student', status:'Error'}));
}
