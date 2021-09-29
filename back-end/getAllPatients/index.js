const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'medcloud.ckbdecugxjkk.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'by7dg512',
    database: 'MEDCLOUD'
})

exports.handler = async function getAllPatients(event) {

    const p = new Promise((resolve) => {
        connection.query('SELECT * FROM Patient', function (err, results) {
            resolve(results);
        })
    })

    const result = await p

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify({ results: result })
    }
}