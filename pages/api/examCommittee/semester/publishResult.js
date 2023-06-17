import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;
    const query = {
        text: `UPDATE exam_info SET published = true,
        publish_date = CURRENT_DATE 
        WHERE exam_session = $1 AND semester = $2`,
        values: [param.session, param.semester]
    }
    const result = await pool.query(query)
        .then(data => res.status(200).send({children:'Submitted Result', severity:'success'}))
        .catch(err => res.status(200).send({children:'Failed to publish', severity:'error'}))
}
