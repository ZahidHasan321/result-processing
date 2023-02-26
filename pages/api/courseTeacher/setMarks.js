import pool from "@/lib/db";

export default async function handler(req, res) {
    const { item, session, course } = req.body

    const query = {
        text: 'INSERT INTO catm_marks VALUES($1, $2, $3, $4, $5) ON CONFLICT (exam_session, course_code, roll) DO UPDATE SET ct = $3, attendance = $4',
        values: [session, course, item.ct, item.attendance, item.roll]
    }
    const result = await pool.query(query)
        .catch(err => err);
    
    if (result.severity == 'ERROR')
        res.status(500).json({ message:"Error"})
    else
        res.status(200).send({message:'Submitted'})
}