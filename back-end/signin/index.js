const mysql = require('mysql');
// const bcrypt = require('bcrypt-nodejs')
const bcrypt = require('bcryptjs');
const jwt = require('jwt-simple')

const authSecret = "adwadawdawdawdaw1351514646" //alterar depois par ao .env

const connection = mysql.createConnection({
    host: 'medcloud.ckbdecugxjkk.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'by7dg512',
    database: 'MEDCLOUD'
})

exports.handler = async function signin(event) {

    const { email, password } = event.body


    // const { email, password } = JSON.parse(event.body) //ATENÇÃO MUDAR AQUI PARA TRANSFORMAR JSON

    // console.log(`${email} ${password}`)
    // if (!email || !password) {
        // return res.status(400).send('Informe usuário e senha!')
    // }

    const userPromise = new Promise((resolve) => {
        connection.query(`SELECT * FROM User WHERE email="${email}" LIMIT 1;`, function (err, results) {
            // console.log(result)
            resolve(results[0]);
        })
    })
    
    const user = await userPromise
    // console.log(password)
    // console.log(user.password)
    
    // if (!user) return res.status(400).send('Usuário não encontrado!')

    // console.log(password)
    // console.log(user.password)

    const isMatch = bcrypt.compareSync(password, user.password)
    
    
    console.log("Logou?")
    console.log(isMatch)
    
    
    // if (!isMatch) return res.status(401).send('Email/senha inválidos!')

    const now = Math.floor(Date.now() / 1000)

    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
        iat: now,
        exp: now + (60 * 60 * 24 * 3)
    }

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "X-Requested-With": "*"
        },
        body: JSON.stringify({ results: {
            ...payload,
            token: jwt.encode(payload, authSecret)
        } })
    }
}