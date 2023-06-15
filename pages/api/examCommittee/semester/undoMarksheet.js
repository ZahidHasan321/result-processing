import pool from "@/lib/db";


export default async function handler(req, res) {
    const param = req.body;

    const query = {
        text: `UPDATE examiner
        SET submitted = false
        WHERE exam_session = $1
        AND course_code = $2`,
        values: [param.exam_session, param.course_code]
    }

    await pool.query(query)
        .then(data => res.status(200).send({ children: 'Undo was successful', severity: 'success' }))
        .catch(err => res.status(500).send({ children: 'Undo was unsuccessful', severity: 'error' }))
}
