const cors = require("cors")
const getRoom = require("../utility/getRoom")
const getStudentRoomID = require("../utility/getStudentRoomID")
const authenticateUser = require("../utility/authenticateUser")

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
        const payload = JSON.parse(event.body)
        const userTokenID = payload.userTokenID

        
        //authenticates user
        let studentID = null
        try { 
            studentID = await authenticateUser(userTokenID)
        } catch (error) {
            return {
                statusCode: 401,
                headers: corsHeaderOptions,
                body: JSON.stringify({ error: 'Unauthorized user.' }),
            };
        }

        const studentRoomID = await getStudentRoomID(studentID);
        //console.log("studentRoomID: ", studentRoomID);

        const room = await getRoom(studentRoomID);
        //console.log(room);
   
        if (room.error) {
            throw new Error(`${room.error}`)
        }

        return {
            statusCode: 200,
            headers: corsHeaderOptions,
            body: JSON.stringify(room)
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