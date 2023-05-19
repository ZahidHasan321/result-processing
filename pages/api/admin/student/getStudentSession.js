import pool from "@/lib/db";

export default async function handler(req, res) {

    const query = 'SELECT DISTINCT exam_session FROM stud_per_session';

    const result = await pool.query(query)
        .then(res => res.rows)
        .catch(err => console.log(err));
    res.status(200).send(result);
}
