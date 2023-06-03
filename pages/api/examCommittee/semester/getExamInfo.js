import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;
    const query = {
        text: 'SELECT * FROM exam_info WHERE exam_session = $1 AND semester = $2',
        values: [param.session, param.semester]
    }
    const result = await pool.query(query)
        .then(data => res.status(200).send(data.rows))
        .catch(err => console.log(err));
    
}

