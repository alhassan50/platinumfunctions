const cors = require("cors")
const getBookingSummary = require("../utility/getBookingSummary")
const authenticateUser = require("../utility/authenticateUser")

const corsHeaderOptions = {
    'Access-Control-Allow-Origin': 'https://platinumhostels.vercel.app',
    //'Access-Control-Allow-Origin': 'http://localhost:3000',
    //'Access-Control-Allow-Origin': ['http://localhost:3000', 'https://platinumhostels.vercel.app'],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

exports.handler = async (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers: corsHeaderOptions,
            body: '',
        };
    }

    // Handles request that aren't POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 404,
            headers: corsHeaderOptions,
            body: JSON.stringify({ error: 'Request Method Denied'})
        };
    }

    // Handle bodyless request
    if (!event.body) {
        return {
            statusCode: 401,
            headers: corsHeaderOptions,
            body: JSON.stringify({ error: 'Empty request body.' }),
        };
    }

    try {
        const payload = JSON.parse(event.body)
        const userTokenID = payload.userTokenID
        //console.log("summary: ", userTokenID);

        //authenticates user
        let studentID = null
        try { 
            studentID = await authenticateUser(userTokenID)
        } catch (error) {
            return {
                statusCode: 401,
                headers: corsHeaderOptions,
                body: JSON.stringify({ error: 'user not authenticated.' }),
            };
        }

        const bookingSummary = await getBookingSummary(studentID);
        
        if (bookingSummary.error) {
            throw new Error(`${bookingSummary.error}`)
        }
        
        //console.log("booking summary: ", bookingSummary);

        return {
            statusCode: 200,
            headers: corsHeaderOptions,
            body: JSON.stringify(bookingSummary)
        };
    } catch (error) {
        console.log(error)
        return {
            statusCode: 401,
            headers: corsHeaderOptions,
            body: JSON.stringify({ error: `Couldn't get room. ${error}`})
        };
    }
}