import pool from "@/lib/db";

export default async function(req, res){
    const param = req.body;

    console.log(param);

    if(param.session == '' || param.semester == ''){
        req.status(505).send("session or semester can't be empty");
    }

    const text = 'INSERT INTO exam_committee VALUES($1, $2, $3, $4)'

    if(param.member1 != '' && param.role1 != ''){
        await pool.query(text, [param.member1, param.semester, param.session, param.role1])
        .catch(err => res.status(505).send('error! selected same person'));
    }

    if(param.member2 != '' && param.role2 != ''){
        await pool.query(text, [param.member2, param.semester, param.session, param.role2])
        .catch(err => res.status(505).send('error! selected same person'));
    }

    if(param.member3 != '' && param.role3 != ''){
        await pool.query(text, [param.member3, param.semester, param.session, param.role3])
        .catch(err => res.status(505).send('error! selected same person'));
    }
    if(param.member4 != '' && param.role4 != ''){
        await pool.query(text, [param.member4, param.semester, param.session, param.role4])
        .catch(err => res.status(505).send('error! selected same person'));
    }
    if(param.member5 != '' && param.role5 != ''){
        await pool.query(text, [param.member5, param.semester, param.session, param.role5])
        .catch(err => res.status(505).send('error! selected same person'));
    }
    res.status(200).send('success');
}