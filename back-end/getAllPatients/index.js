const mysql = require('mysql');
const jwt = require('jwt-simple')

const authSecret = "adwadawdawdawdaw1351514646"

const connection = mysql.createConnection({
    host: 'medcloud.ckbdecugxjkk.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'by7dg512',
    database: 'MEDCLOUD'
})

exports.handler = async function getAllPatients(event) {

    const tokenAuthorization = event.headers.Authorization
    let logged = false
    try {
        if (tokenAuthorization) {
            const token = jwt.decode(tokenAuthorization, authSecret)
            if (new Date(token.exp * 1000) > new Date()) {
                console.log("usuario autenticado")
                logged = true
            }
        }
    } catch (e) {
        console.log("Não logado");
    }

    let result = null;
    if (logged) {
        const p = new Promise((resolve) => {
            connection.query('SELECT * FROM Patient', function (err, results) {
                resolve(results);
            });
        });

        result = await p;

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify({ results: result })
        };
    } else {
        return {
            statusCode: 401,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify({ results: "Login não autorizado" })
        };
    }
};