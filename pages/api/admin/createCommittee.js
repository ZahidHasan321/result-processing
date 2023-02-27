import pool from "@/lib/db";

export default async function (req, res) {
    const param = req.body;


    if (param.session == '' || param.semester == '' || isNaN(param.session)) {
        res.status(505).send({message: "session or semester can't be empty"});
        return;
    }
    else {
        const client = await pool.connect();
        try {
            await client.query('BEGIN')
            const text = 'INSERT INTO exam_committee(id, semester, exam_session, role) VALUES($1, $2, $3, $4)'

            if (param.member1 != '') {
                await client.query(text, [param.member1, param.semester, param.session, param.role1])
            }

            if (param.member2 != '') {
                await client.query(text, [param.member2, param.semester, param.session, param.role2])
            }


            if (param.member3 != '') {
                await client.query(text, [param.member3, param.semester, param.session, param.role3])
            }

            if (param.member4 != '') {
                await client.query(text, [param.member4, param.semester, param.session, param.role4])

            }
            if (param.member5 != '') {
                await client.query(text, [param.member5, param.semester, param.session, param.role5])
            }

            await client.query(
                {
                    text: 'SELECT insert_into_sem_course($1, $2)',
                    values: [param.semester, param.session]
                }
            ).catch(err => console.log(err));
            await client.query('COMMIT')
            res.status(200).send({ message: 'Committee Created' })
            
        }
        catch (e) {
            await client.query('ROLLBACK')
            res.status(500).send({ message: 'Couldnot create committee' });
            throw e
        } 
        finally {
            client.release()
        }
    }

}