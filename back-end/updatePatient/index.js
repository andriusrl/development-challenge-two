const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'medcloud.ckbdecugxjkk.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'by7dg512',
    database: 'MEDCLOUD'
})

exports.handler = async function updatePatient(event) {

    const { id, name, last_name, cpf, street, street_number, district, cep, city } = JSON.parse(event.body)

    const p = new Promise((resolve) => {
        connection.query(`UPDATE Patient SET name = "${name}",
        last_name = "${last_name}",
        cpf = "${cpf}",
        street = "${street}",
        street_number = ${street_number},
        district = "${district}",
        cep = "${cep}",
        city = "${city}" WHERE id = ${id};`, function (err, results) {
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