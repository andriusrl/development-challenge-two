const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.host,
    user: 'admin',
    password: process.env.dbPassword,
    database: process.env.dbName
})

exports.handler = async function getPatient(event) {

    const { id } = JSON.parse(event.body)

    const p = new Promise((resolve)=>{
        connection.query(`SELECT * FROM Patient WHERE id=${id} LIMIT 1;`, function(err, results){
            console.log(results)
            resolve(results);
        })
    })

    const result = await p

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
        body: JSON.stringify({ results: result })
    }
}