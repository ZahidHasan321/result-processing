

import pool from "@/lib/db";

export default async function handler(req, res) {
    const {  session, course } = req.body

    const query2 = {
        text: 'UPDATE sem_course SET catm = true WHERE exam_session = $1 AND course_code = $2',
        values: [session, course]
    }
    pool.query(query2)
        .catch(err => console.log(err));

    const query3 = {
        text: 'UPDATE course_teacher SET submitted = true, submit_date = CURRENT_DATE WHERE exam_session = $1 AND course_code = $2',
        values: [session, course]
    }
    pool.query(query3)
        .catch(err => console.log(err));

    res.status(200).send({ message: 'Inserted' })
}

