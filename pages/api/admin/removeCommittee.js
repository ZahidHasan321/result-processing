import pool from "@/lib/db";

export default async function handler(req, res)
{
    const param = req.body;

    const query = {
        text: 'DELETE FROM exam_committee WHERE exam_session = $1 AND semester = $2',
        values: [param.session, param.semester]
    }

    await pool.query(query)
    .then(response => res.status(200).send(response))
    .catch(err => res.status(500).send(err))

    const query2 = {
        text: 'DELETE FROM sem_course WHERE exam_session = $1',
        values: [param.session]
    }

    await pool.query(query2)
    .catch(err => console.log(err));
}