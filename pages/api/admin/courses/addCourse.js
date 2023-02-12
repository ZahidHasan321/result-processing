import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;
    console.log(param.code)
    const query = {
        text:'INSERT INTO course VALUES($1::int, $2::text, $3::int, $4::text, $5::int)',
        values:[param.code, param.name, param.credit, param.type, param.semester]
    }
    const result = await pool.query(query)
    .then(res => res.rows)
    .catch(err => err)
    res.send(result);
}
