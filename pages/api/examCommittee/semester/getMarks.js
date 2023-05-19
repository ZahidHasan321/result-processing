import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;

    const query = {
        text: `SELECT t1.code, t3.roll, t4.name, t2.question, t2.mark FROM topsheet t1 LEFT JOIN marks t2 
	ON t1.code = t2.paper_code 
	AND t1.exam_session = t2.exam_session 
	AND t1.course_code = t2.course_code 
	AND t1.set = t2.set
LEFT JOIN stud_mark t3
	ON t3.code = t1.code
	AND t3.exam_session = t1.exam_session 
	AND t3.course_code = t1.course_code 
	AND t3.set = t1.set
LEFT JOIN student t4
	ON t3.roll = t4.roll
WHERE t1.exam_session = $1 AND t1.course_code = $2 AND t1.set = $3 AND type = $4 ORDER BY t1.code`,
        values: [param.session, param.course, param.set, 'present']
    }
    const result = await pool.query(query)
        .then(data => res.status(200).send(data.rows))
        .catch(err => {
            console.log(err);
            res.status(500).send([])
        });

}