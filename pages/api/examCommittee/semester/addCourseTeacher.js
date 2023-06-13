import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;
    
    const query = {
        text: `INSERT INTO course_teacher(id, exam_session, course_code, assigned_date) 
        VALUES ($1, $2, $3, CURRENT_DATE) ON CONFLICT(exam_session, course_code) 
        DO UPDATE SET id = ($1)::uuid, assigned_date = CURRENT_DATE`,
        values: [param.id, param.session, param.course]
    }
    const result = await pool.query(query)
        .then(data => {res.status(200).send(data.rows)})
        .catch(err => {console.log(err); res.status(500).send({message:'Course teacher already exists'})})
}
