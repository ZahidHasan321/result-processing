import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;

    const query = {
        text: 'INSERT INTO courses VALUES($1::text, $2::text, $3::int, $4::text, $5::int)',
        values: [param.code, param.name, param.credit, param.type, param.semester]
    }
    pool.query(query)
        .then(data => res.status(200).send(data.rows))
        .catch(err => res.status(500).send(err))
    
}

