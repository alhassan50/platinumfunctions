const nodemailer = require("nodemailer")
const cors = require("cors");
const validateContactFormData = require("../utility/validateContactFormData")
const getMessage = require("../utility/getMessage")
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
OAuth2_client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})

require('dotenv').config();

const corsHeaderOptions = {
    /* 'Access-Control-Allow-Origin': 'http://localhost:3000', */
    'Access-Control-Allow-Origin': 'https://platinumhostels.vercel.app',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

exports.handler = async (event) => {

    // Handle OPTIONS request (preflight)
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

    let contactFormData = {}
    
    try {
        contactFormData = JSON.parse(event.body)
        const isContactFormDataValid = validateContactFormData(contactFormData).isValid
        if (!isContactFormDataValid) {
            throw new Error(`Invalid contact form data.`);
        }
    } catch (error) {
        return {
            statusCode: 402,
            headers: corsHeaderOptions,
            body: JSON.stringify({ error: `${error}` }),
        };
    }

    let accessToken=null

    try {
        /* console.log('creating access token...'); */
        accessToken = await OAuth2_client.getAccessTokenAsync();
        /* console.log('access token created!', accessToken); */
    } catch (error) {
        /* console.log(error); */
        return {
            statusCode: 408,
            headers: corsHeaderOptions,
            body: JSON.stringify({ error: `${error}` }),
        };
    }
    
    /* console.log('creating transporter...'); */
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.forwardemail.net",
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken
        }
    })

    /* console.log('creating contact msger...');  */   
    const contactMsg = {
        from: `${contactFormData.fullName} ${contactFormData.email}`,
        to: process.env.MAIL_USERNAME,
        subject: `New mail from ${contactFormData.email}${contactFormData.subject && `: ${contactFormData.subject}`}`,
        text: getMessage(contactFormData.message, contactFormData.phoneNumber, contactFormData.email, contactFormData.fullName)
    }

    try {
        /* console.log('senidng email...'); */
        let info = await transporter.sendMail(contactMsg)
        /* console.log("Success Message: Message successfully sent"); */

        return {
            statusCode: 200,
            headers: corsHeaderOptions,
            body: JSON.stringify({ message: 'Your message has been sent successfully. Check you gmail inbox from time to time for a reply. Thank you!', info}),
        };
    } catch (error) {
        //console.log(error);
        return {
            statusCode: 403,
            headers: corsHeaderOptions,
            body: JSON.stringify({ error: `Failed to send message: ${error}` }),
        };
    }
}