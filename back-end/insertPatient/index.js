const mysql = require('mysql');
const jwt = require('jwt-simple')

const authSecret = process.env.authSecret

const connection = mysql.createConnection({
    host: process.env.host,
    user: 'admin',
    password: process.env.dbPassword,
    database: process.env.dbName
})

exports.handler = async function insertPatient(event) {

    const { name, last_name, cpf, street, street_number, district, cep, city } = JSON.parse(event.body)
    const tokenAuthorization = event.headers.Authorization
    let logged = false
    try {
        if (tokenAuthorization) {
            const token = jwt.decode(tokenAuthorization, authSecret)
            if (new Date(token.exp * 1000) > new Date()) {
                logged = true
            }
        }
    } catch (e) {
        console.log("Não logado");
    }
    
    let result = null;
    if(logged){
        const p = new Promise((resolve) => {
        connection.query(`INSERT INTO Patient (name, last_name, cpf, street, street_number, district, cep, city)
                VALUES ('${name}', '${last_name}', '${cpf}', '${street}', '${street_number}', '${district}', '${cep}', '${city}');`,
            function (err, results) {
                console.log(results)
                resolve(results);
            })
        })

        result = await p
    
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE",
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Origin": "*",
                "X-Requested-With": "*"
            },
            body: JSON.stringify({ results: result })
        }
    } else{
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
}