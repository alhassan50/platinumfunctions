const setProfileInfo = require("../utility/setProfileInfo")
const validateProfileInfo = require("../utility/validateProfileInfo")

const corsHeaderOptions = {
    //'Access-Control-Allow-Origin': 'https://platinumhostels.vercel.app',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
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
    if (event.httpMethod !== 'PUT') {
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
        //const payload = event.body

        const userTokenID = payload.userTokenID
        const profileInfo = payload.profileInfo

        console.log("payload: ", payload);
        console.log("userTokenID: ", userTokenID);
        console.log("profileInfo: ", profileInfo);

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

        let validProfileInfo = null
        try { 
            let validationResult = validateProfileInfo(profileInfo)
            if (validationResult.isValid) {
                validProfileInfo = validationResult.validProfileInfo
            } else {
                throw new Error('Invalid profile info')
            }
        } catch (error) {
            console.log(error)
            return {
                statusCode: 400,
                headers: corsHeaderOptions,
                body: JSON.stringify('Invalid profile params.'),
            };
        }

        const userRecord = await setProfileInfo(validProfileInfo, studentID);
        
        if (userRecord.error) {
            throw new Error(`${userRecord.error}`)
        }

        return {
            statusCode: 200,
            headers: corsHeaderOptions,
            body: JSON.stringify(userRecord)
        };
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            headers: corsHeaderOptions,
            body: JSON.stringify(`Something went wrong while updating your profile`)
        };
    }
}