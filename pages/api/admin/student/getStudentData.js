import pool from "@/lib/db";

export default async function handler(req, res) {

    console.log(req.body);

    const query = {
        text: 'SELECT student.roll, name, hall,improve FROM student JOIN stud_per_session ON student.roll = stud_per_session.roll WHERE exam_session = $1 AND semester = $2',
        values: Object.values(req.body)
    }

    const result = await pool.query(query)
        .then(res => res.rows)
        .catch(err => console.log(err));
    res.status(200).send(result);
}
