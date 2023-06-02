import pool from "@/lib/db";

export default async function handler(req, res) {
    const { session, semester } = req.body;

    const query = {
        text: `SELECT * FROM summation_sheet s
        JOIN courses c 
        ON s.course_code = c.course_code
        JOIN stud_per_session st
        ON s.roll = st.roll
        AND s.exam_session = st.exam_session
        AND c.semester = st.semester
        WHERE s.exam_session = $1 AND
        c.semester = $2`,
        values: [session, semester]
    }
    const result = await pool.query(query)
        .then(data => data.rows)
        .catch(err =>{
             res.status(500).send([]);
            });

    const hash = new Map()
    result.forEach((obj, idx) => {
        if(Boolean(hash.get(obj.roll))){
            hash.set(obj.roll, [...hash.get(obj.roll), obj])
        }
        else{
            hash.set(obj.roll, [obj])
        }
    })
    const arr = await Object.fromEntries(hash)
    res.status(200).send(arr);
}