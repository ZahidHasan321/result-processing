import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;
    const query = {
        text: 'UPDATE courses SET course_name = $1, course_credit = $2, course_type = $3, max_mark = $4 WHERE course_code = $5',
        values: [param.name, param.credit, param.type, param.mark, param.code]
    }
    await pool.query(query)
    .then(data => res.status(200).send({message:'Updated course', status:'success'}))
    .catch(err => {res.status(500).send({message:'Could not update course', status:'error'}), console.log(err)})
}
