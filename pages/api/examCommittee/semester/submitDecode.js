import pool from "@/lib/db";

export default async function handler(req, res) {
    const query = {
        text: 'UPDATE topsheet SET roll = $1 WHERE exam_session = $2 AND course_code = $3 AND set = $4 AND code = $5',
        values: Object.values(req.body)
    }

    pool.query(query)
        .catch(err => console.log(err))
    res.status(200).send({message:'submitted'});
}