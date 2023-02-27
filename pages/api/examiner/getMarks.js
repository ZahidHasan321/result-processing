import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;

    const query = {
        text: 'SELECT topsheet.code AS paper_code, marks.question, marks.mark FROM marks RIGHT JOIN topsheet ON topsheet.code = marks.paper_code WHERE topsheet.exam_session = $1 AND topsheet.course_code = $2 AND topsheet.set = $3 AND type = $4',
        values: [param.session, param.course, param.set, 'present']
    }
    const result = await pool.query(query)
        .then(data => data.rows)
        .catch(err => console.log(err));

        res.status(200).send(result)

}