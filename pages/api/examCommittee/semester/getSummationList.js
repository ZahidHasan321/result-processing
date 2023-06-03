import pool from "@/lib/db";

export default async function handler(req, res) {
    const { session, course } = req.body;

    const query = {
        text: `SELECT * FROM summation_sheet t1
        JOIN student t2 ON t1.roll = t2.roll
        WHERE exam_session = $1 AND course_code = $2`,
        values: [session, course]
    }
    const result = await pool.query(query)
        .then(data => data.rows)
        .catch(err =>{
             res.status(500).send([]);
            });

    res.status(200).send(result);
}