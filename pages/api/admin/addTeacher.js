import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body
    const query = { 
        text: 'INSERT INTO users(email, password, name, phone, department) VALUES($1, $2, $3, $4, $5)',
        values: [param.email, param.password, param.name, param.phone, param.dept]
    }
  
  const result = await pool.query(query)
  .then(err => console.log(err));

  res.send(result);
}
