import pool from "@/lib/db";

export default async function handler(req, res) {
    console.log(req.body);
    
    const query = {
        text: 'SELECT * FROM sem_course JOIN courses ON sem_course.course_code = courses.course_code WHERE semester = $1',
        values: [req.body]
    }
    const result = await pool.query(query)
        .then(data => res.status(200).send(data.rows))
        .catch(err => res.status(500).send(err))
}
