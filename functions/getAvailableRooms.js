const cors = require("cors");
require('dotenv').config();
const validation = require("../utility/validation")
const validateAvailableRoomsParams = require("../utility/validateAvailableRoomsParams")
const availableRooms = require("../utility/availableRooms")

const corsHeaderOptions = {
    'Access-Control-Allow-Origin': 'https://platinumhostels.vercel.app',
    //'Access-Control-Allow-Origin': ['http://localhost:3000', 'https://platinumhostels.vercel.app'],
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
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
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 404,
            headers: corsHeaderOptions,
            body: JSON.stringify({ error: 'Request Method Denied'})
        };
    }

    try {
        // Retrieve query parameters
        const { hostelLocation, roomType, gender } = event.queryStringParameters;

        const areRoomsQueryParams = validateAvailableRoomsParams(hostelLocation, roomType, gender).isValid

        if (!areRoomsQueryParams) {
            throw new Error(`Invalid Query Parameters.`)
        }


        // Use query parameters in your logic
        const availableRoomsArray = await availableRooms(hostelLocation, roomType, gender);

        console.log(availableRoomsArray);
        
        return {
            statusCode: 200,
            headers: corsHeaderOptions,
            body: JSON.stringify({ availableRooms: availableRoomsArray})
        };
    } catch (error) {
        console.log(error)
        return {
            statusCode: 401,
            headers: corsHeaderOptions,
            body: JSON.stringify({ error: `Couldn't fetch rooms. ${error}`})
        };
    }
}