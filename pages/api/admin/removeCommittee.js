import pool from "@/lib/db";

export default async function handler(req, res) {
    const param = req.body;

    const client = await pool.connect();
    try {

        client.query("BEGIN");
        const query = {
            text: 'DELETE FROM exam_committee WHERE exam_session = $1 AND semester = $2',
            values: [param.session, param.semester]
        }

        await client.query(query)

        const query3 = {
            text: `DELETE FROM examiner USING courses 
        WHERE examiner.course_code = courses.course_code
        AND examiner.exam_session = $1 
        AND courses.semester = $2`,
            values: [param.session, param.semester]
        }

        await client.query(query3)

        const query4 = {
            text: `DELETE FROM course_teacher USING courses 
            WHERE course_teacher.course_code = courses.course_code
            AND course_teacher.exam_session = $1 
            AND courses.semester = $2`,
            values: [param.session, param.semester]
        }

        await client.query(query4)

        const query6 = {
            text: `DELETE FROM topsheet USING courses 
            WHERE topsheet.course_code = courses.course_code
            AND topsheet.exam_session = $1 
            AND courses.semester = $2`,
            values: [param.session, param.semester]
        }

        await client.query(query6)


        const query7 = {
            text: `DELETE FROM summation_sheet USING courses 
            WHERE summation_sheet.course_code = courses.course_code
            AND summation_sheet.exam_session = $1 
            AND courses.semester = $2`,
            values: [param.session, param.semester]
        }

        await client.query(query7)

        const query8 = {
            text: `DELETE FROM marks USING courses 
            WHERE marks.course_code = courses.course_code
            AND marks.exam_session = $1 
            AND courses.semester = $2`,
            values: [param.session, param.semester]
        }

        await client.query(query8)

        const query9 = {
            text: `DELETE FROM catm_marks USING courses 
            WHERE catm_marks.course_code = courses.course_code
            AND catm_marks.exam_session = $1 
            AND courses.semester = $2`,
            values: [param.session, param.semester]
        }

        await client.query(query9)

        const query2 = {
            text: `DELETE FROM sem_course USING courses WHERE sem_course.exam_session = $1 AND semester = $2`,
            values: [param.session, param.semester]
        }

        await client.query(query2)

        const query5 = {
            text: `DELETE FROM exam_info WHERE exam_session = $1 AND semester = $2`,
            values: [param.session, param.semester]
        }

        await client.query(query5);

        client.query('COMMIT')
        res.status(200).send({message: "Deleted successfullly",status:'Success'});

    }
    catch (e) {
        client.query("ROLLBACK");
        res.status(500).send({message: "Failed to delete",status:'Error'});

    }
    finally {
        client.release()
    }
}