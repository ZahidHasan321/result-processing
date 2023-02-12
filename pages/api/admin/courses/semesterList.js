import pool from "@/lib/db";

export default async function handler(req, res) {
    const query = {
        text:'SELECT DISTINCT semester FROM course'
    }
    const result = await pool.query(query)
    .then(res => res.rows)
    .catch(err => err)

    res.send(result);
}
