import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;
    const query = {
        text: `SELECT EXISTS(
            SELECT 1 FROM exam_committee
            WHERE exam_session = $1
            AND semester = $2
            AND id = $3
        )`,
        values: [param.session, param.semester, param.id]
    }
    const result = await pool.query(query)
        .then(data => data.rows)
        .catch(err => console.log(err))
        
        res.status(200).send(result);
}
