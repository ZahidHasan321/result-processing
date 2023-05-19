import pool from "@/lib/db";

export default async function handler(req, res) {

    const query = {
        text: 'SELECT DISTINCT semester FROM stud_per_session WHERE exam_session = $1::int',
        values: [req.body]
    }

    const result = await pool.query(query)
        .then(res => res.rows)
        .catch(err => console.log(err));
    res.status(200).send(result);
}
