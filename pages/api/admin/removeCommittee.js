import pool from "@/lib/db";

export default async function handler(req, res)
{
    const param = req.body;
    console.log(param);
    const query = {
        text: 'DELETE FROM exam_committee WHERE exam_session = $1 AND semester = $2',
        values: [param.session, param.semester]
    }

    pool.query(query)
    .then(response => res.status(200).send(response))
    .catch(err => res.status(505).send(err))
}