const cors = require("cors")
const validateAccountData = require("../utility/validateAccountData")
const firebaseAdminConfig = require("../config/firebaseAdminConfig") 
const addStudent = require("../utility/addStudent")
const validateAccount = require("../utility/validateAccount")

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
        let studentAccountData = null
        let studentUID = null
        let customToken = null

        try {
            const {accountData, uid} = JSON.parse(event.body)
            
            studentAccountData = accountData
            studentUID = uid

            const isAccountDataValid = validateAccountData(accountData).isValid

            if (!isAccountDataValid) {
                throw new Error(`Invalid booking data.`);
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 400,
                headers: corsHeaderOptions,
                body: JSON.stringify(`${error.message}`),
            };
        }

        //validate uid
        try {
            isAccountValid = validateAccount(studentAccountData, studentUID)

            if (!isAccountValid) {
                throw new Error("Couldn't find Account")
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 400,
                headers: corsHeaderOptions,
                body: JSON.stringify(`${error.message}`),
            }; 
        }

        try {
            await addStudent(studentAccountData, studentUID)
            customToken = await firebaseAdminConfig.auth.createCustomToken(studentUID)
        } catch (error) {
            throw error
        }
        
        if (!customToken) {
            return {
                statusCode: 500,
                headers: corsHeaderOptions,
                body: JSON.stringify('Invalid custom token')
            };
        }

        console.log(studentAccountData);
        console.log(studentUID);

        //successful process 
        return {
            statusCode: 202,
            headers: corsHeaderOptions,
            body: JSON.stringify({customToken: customToken})
        };
    } catch (error) {
        console.log(error);

        if (error.errorInfo.code && error.errorInfo.code === 'app/network-error') {
            return {
                statusCode: 500,
                headers: corsHeaderOptions,
                body: JSON.stringify("Oops! Something went wrong. Please check your internet connection and try again.")
            };
        }

        return {
            statusCode: 500,
            headers: corsHeaderOptions,
            body: JSON.stringify('Oops! Something went wrong while creating your account.')
        };
    }
}