
import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;

    var paperset = (param.set === 'A') ? 'submitted_a' : 'submitted_b';

    const query1 = {
        text: 'UPDATE examiner SET submitted = true, submit_date = CURRENT_DATE WHERE exam_session = $1 AND course_code = $2 AND set_number = $3',
        values: [param.session, param.course, param.set]
    }
    const result = await pool.query(query1)
        .catch(err => err);


    const query2 = {
        text: `UPDATE sem_course SET ${paperset}= true WHERE exam_session = $1 AND course_code = $2`,
        values: [param.session, param.course]
    }
    await pool.query(query2)
        .catch(err => err);

    res.status(200).send(result);
}