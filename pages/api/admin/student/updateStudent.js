import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body

    const client = await pool.connect()
    const query = {
        text: 'UPDATE student SET name = $1, hall = $2 WHERE roll = $3',
        values: [param.name, param.hall, param.id]
    }

    const query1 = {
        text: 'UPDATE stud_per_session SET improve = $1 WHERE roll = $2 AND exam_session = $3 AND semester = $4',
        values: [param.improve, param.id, param.session, param.semester]
    }

    try {
        await client.query('BEGIN')
        await client.query(query)
        await client.query(query1)
        await client.query("COMMIT")
        res.status(200).send({message:"Updated student data", status:"Success"})
    }
    catch(e){
        await client.query("ROLLBACK")
        res.status(500).send({message:"Error while updating", status:"Error"})
    }
    finally{
        client.release()
    }

 
}
