import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;
    const query = {
        text: 'UPDATE exam_info SET start_date = $3 WHERE exam_session = $1 AND semester = $2',
        values: [param.session, param.semester, param.startDate]
    }
    const result = await pool.query(query)
        .then(data => res.status(200).send(data))
        .catch(err => console.log(err));
    
}

