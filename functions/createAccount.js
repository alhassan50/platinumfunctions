const cors = require("cors")
const validateAccountData = require("../utility/validateAccountData")
const createStudentAccount = require("../utility/createStudentAccount");
const addStudent = require("../utility/addStudent")

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
        console.log(event.body)

        let studentAccountData

        try {
            const studentData = JSON.parse(event.body)
            studentAccountData = studentData

            const isStudentDataValid = validateAccountData(studentData).isValid

            if (!isStudentDataValid) {
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

        //let customToken = null
        let uid = null
        
        try {
            const accountIdObj = await createStudentAccount(studentAccountData)
            uid = accountIdObj.uid
        } catch (error) {
            if (error.errorInfo.code && error.errorInfo.code === 'auth/email-already-exists') {
                return {
                    statusCode: 400,
                    headers: corsHeaderOptions,
                    body: JSON.stringify("Email address already in use. Log in or reset password.")
                };
            }
            
            if (error.errorInfo.code && error.errorInfo.code === 'auth/phone-number-already-exists') {
                return {
                    statusCode: 400,
                    headers: corsHeaderOptions,
                    body: JSON.stringify("Phone number already in use. Log in or reset password.")
                };
            }

            //delete user account
            console.log('deleting account....');

            throw error
        }

        if (!uid) {
            throw new Error('Invalid UID')
        }

        //successful process 
        return {
            statusCode: 202,
            headers: corsHeaderOptions,
            body: JSON.stringify({accountData: studentAccountData, uid: uid})
        };
    } catch (error) {
        console.log("::::::::::::::::::::::", error);

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