import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;

    const query = {
        text: 'INSERT INTO marks VALUES ($1::int, $2::text, $3::text, $4::int, $5::text, $6::numeric) ON CONFLICT (exam_session, course_code, set, paper_code, question)' +
        ' DO UPDATE set mark = $6',
        values: [param.session, param.course, param.set, param.paperCode, param.question, param.mark]
    }
    const result = await pool.query(query)
        .catch(err => err);


    if (result.severity == 'ERROR'){
        res.status(500).send(result);
    }
    else
        res.status(200).send(result)
}