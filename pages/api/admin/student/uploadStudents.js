import pool from "@/lib/db";

export default async function handler(req, res) {
    const { list, session, semester } = req.body;

    console.log(req.body)

    const client = await pool.connect()

    try {
        await client.query("BEGIN");

        const text = "INSERT INTO student VALUES($1, $2, $3) ON CONFLICT(roll) DO UPDATE SET name = $2, hall = $3";
        const text2 = "INSERT INTO stud_per_session VALUES($1, $2, $3, $4) ON CONFLICT(roll,exam_session,semester) DO UPDATE SET roll = excluded.roll"

        list.map(async (item) => {
            await client.query(text, [item.id || item.roll, item.name, item.hall])

            await client.query(text2, [item.id || item.roll, session, semester, item.improve ? item.improve : false])   
        })

        await client.query("COMMIT");
        res.status(200).send({ message: 'Submitted' });
    }
    catch (e) {
        await client.query("ROLLBACK");
        res.status(500).send({ message: 'Error while submitting' })
    }
    finally {
        client.release()
    }
}
