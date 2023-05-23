import pool from "@/lib/db";

export default async function handler(req, res) {
    const { session, semester } = req.body;

    const query = {
        text: `SELECT * FROM summation_sheet s 
        JOIN courses c 
        ON s.course_code = c.course_code
        WHERE exam_session = $1 AND
        semester = $2`,
        values: [session, semester]
    }
    const result = await pool.query(query)
        .then(data => data.rows)
        .catch(err =>{
             res.status(500).send([]);
            });

    res.status(200).send(result);
}