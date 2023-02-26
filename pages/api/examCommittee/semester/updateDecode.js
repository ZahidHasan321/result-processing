

import pool from "@/lib/db";

export default async function handler(req, res) {
    const { session, course, set} = req.body

    var set_no;

    set_no = set === 'A' ? 'decoded_a' : 'decoded_b';

    const query2 = {
        text: `UPDATE sem_course SET ${set_no} = true WHERE exam_session = $1 AND course_code = $2`,
        values: [session, course]
    }
    pool.query(query2)
        .catch(err => console.log(err));

    const query3 = {
        text: 'UPDATE examiner SET decoded = true, decode_date = CURRENT_DATE WHERE exam_session = $1 AND course_code = $2 AND set_number = $3',
        values: [session, course, set]
    }
    pool.query(query3)
        .catch(err => console.log(err));

    res.status(200).send({ message: 'Inserted' })
}

