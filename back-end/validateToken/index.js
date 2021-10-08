const jwt = require('jwt-simple')

const authSecret = "adwadawdawdawdaw1351514646" //alterar depois par ao .env

exports.handler = async function validateToken(event) {

    // const params = {
    //     secretOrKey: authSecret,
    //     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    // }

    const userData = event || null
    console.log(userData)
    // try {
    //     if (userData) {
    //         const token = jwt.decode(userData.token, authSecret)
    //         if (new Date(token.exp * 1000) > new Date()) {
    //             console.log("usuasrio autenticado")
    //             return res.send(true)
    //         }
    //     }
    // } catch (e) {

    // }
    // return {
    //     statusCode: 200,
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    //         "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    //         "Access-Control-Allow-Credentials": true,
    //         "Access-Control-Allow-Origin": "*",
    //         "X-Requested-With": "*"
    //     },
    //     body: JSON.stringify({ results: {
    //         ...payload,
    //         token: jwt.encode(payload, authSecret)
    //     } })
    // }
}