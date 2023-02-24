import pool from "@/lib/db";

export default async function handler(req, res) {
const param = req.body;

const query = {
    text: 'INSERT INTO marks ',
    values: [param.session, param.course, param.set, "present"]
}
    const result = await pool.query(query)
    .then(data => data.rows)
    .catch(err => console.log(err));
    res.status(200).send(result);
}