const cors = require("cors")
const getAcademicProfile = require("../utility/getAcademicProfile")
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
            body: JSON.stringify('Request Method Denied')
        };
    }

    // Handle bodyless request
    if (!event.body) {
        return {
            statusCode: 400,
            headers: corsHeaderOptions,
            body: JSON.stringify('Empty request body.'),
        };
    }

    try {
        const payload = JSON.parse(event.body)
        const userTokenID = payload.userTokenID
        //console.log("userTokenID: ", userTokenID);

        //authenticates user
        let studentID = null
        try { 
            studentID = await authenticateUser(userTokenID)
        } catch (error) {
            console.log(error)
            return {
                statusCode: 401,
                headers: corsHeaderOptions,
                body: JSON.stringify('User not authorized.'),
            };
        }

        const academicProfile = await getAcademicProfile(studentID);
        
        if (academicProfile.error) {
            throw new Error(`${academicProfile.error}`)
        }
        
        //console.log("academicProfile: ", academicProfile);

        return {
            statusCode: 200,
            headers: corsHeaderOptions,
            body: JSON.stringify({academicProfile: academicProfile})
        };
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            headers: corsHeaderOptions,
            body: JSON.stringify(`An unexpected error occurred while getting your academic profile.`)
        };
    }
}