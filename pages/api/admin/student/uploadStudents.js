import pool from "@/lib/db";

export default async function handler(req, res) {
    const { list, session, semester } = req.body;

    const client = await pool.connect()

    try {
        await client.query("BEGIN");

        const text = "INSERT INTO student VALUES($1, $2, $3) ON CONFLICT(roll) DO UPDATE SET name = $2, hall = $3";
        const text2 = "INSERT INTO stud_per_session VALUES($1, $2, $3) ON CONFLICT DO NOTHING"

        list.map(async (item) => {
            await client.query(text, Object.values(item))
                .catch(err => {
                    throw err;
                })
            await client.query(text2, [item.id, session, semester])
                .catch(err => {
                    throw err;
                })
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
