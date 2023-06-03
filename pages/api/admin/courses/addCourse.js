import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;

    const query = {
        text: 'INSERT INTO courses VALUES($1::text, $2::text, $3::int, $4::text, $5::int, $6::int)',
        values: [param.code, param.name, param.credit, param.type, param.semester, param.mark]
    }
    const result = await pool.query(query)
        .catch(err => err);
        
    if (result.severity == 'ERROR')
        res.status(500).send(result);
    else
        res.status(200).send(result)

}

