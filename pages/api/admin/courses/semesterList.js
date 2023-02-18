import pool from "@/lib/db";

export default async function handler(req, res) {
    const query = {
        text:'SELECT DISTINCT semester FROM courses'
    }
    
    await pool.query(query)
    .then(data => res.status(200).send(data.rows))
    .catch(err => res.status(500).send(err))
}
