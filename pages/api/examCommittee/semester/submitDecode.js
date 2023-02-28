import pool from "@/lib/db";

export default async function handler(req, res) {
    const query = {
        text: 'INSERT INTO stud_mark VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT(exam_session, course_code, set, code) DO UPDATE set roll = $5, total = $6',
        values: Object.values(req.body)
    }

    pool.query(query)
        .catch(err => console.log(err))
    res.status(200).send({message:'submitted'});
}