const cors = require("cors")
const validateAccountData = require("../utility/validateAccountData")
const createStudentAccount = require("../utility/createStudentAccount");

const corsHeaderOptions = {
    'Access-Control-Allow-Origin': 'https://platinumhostels.vercel.app',
    //'Access-Control-Allow-Origin': 'http://localhost:3000',
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
            statusCode: 405,
            headers: corsHeaderOptions,
            body: JSON.stringify({ error: 'Request Method Denied'})
        };
    }

    // Handle bodyless request
    if (!event.body) {
        return {
            statusCode: 400,
            headers: corsHeaderOptions,
            body: JSON.stringify({ error: 'Empty request body.' }),
        };
    }

    try {
        let studentAccountData

        try {
            const {studentData} = JSON.parse(event.body)
            studentAccountData = studentData

            const isStudentDataValid = validateAccountData(studentData).isValid

            if (!isStudentDataValid) {
                throw new Error(`Invalid account data.`);
            }
        } catch (error) {
            return {
                statusCode: 400,
                headers: corsHeaderOptions,
                body: JSON.stringify({ error: `${error}` }),
            };
        }

        console.log("studentAccountData: ", studentAccountData);

        try {
            const uid = await createStudentAccount(studentAccountData)
            console.log('main uid: ', uid);
        } catch (error) {
            console.log(error);
            throw new Error (error)
        }
        

        return {
            statusCode: 202,
            headers: corsHeaderOptions,
            body: JSON.stringify('success')
        };
    } catch (error) {
        //console.log(error)
        return {
            statusCode: 500,
            headers: corsHeaderOptions,
            body: JSON.stringify({ error: `Failed to get room details.`})
        };
    }
}