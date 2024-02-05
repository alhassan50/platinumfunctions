const cors = require("cors");
require('dotenv').config();
const validateAvailableRoomsParams = require("../utility/validateAvailableRoomsParams")
const availableRooms = require("../utility/availableRooms")

const corsHeaderOptions = {
    //'Access-Control-Allow-Origin': 'https://platinumhostels.vercel.app',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
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
            statusCode: 405,
            headers: corsHeaderOptions,
            body: JSON.stringify({ error: 'Request Method Denied'})
        };
    }

    if (event.body) {
        return {
            statusCode: 400,
            headers: corsHeaderOptions,
            body: JSON.stringify({ error: 'Non empty request body'})
        }
    }

    try {
        // Retrieve query parameters
        const { hostelLocation, roomType, gender } = event.queryStringParameters;

        try {
            const areRoomsQueryParams = validateAvailableRoomsParams(hostelLocation, roomType, gender).isValid
    
            if (!areRoomsQueryParams) {
                throw new Error(`Invalid query parameters.`)
            }
        } catch (error) {
            return {
                statusCode: 400,
                headers: corsHeaderOptions,
                body: JSON.stringify({ error: `${error}`})
            }
        }

        const availableRoomsArray = await availableRooms(hostelLocation, roomType, gender);
        
        return {
            statusCode: 200,
            headers: corsHeaderOptions,
            body: JSON.stringify({ availableRooms: availableRoomsArray})
        };
    } catch (error) {
        console.log(error)
        return {
            statusCode: 500,
            headers: corsHeaderOptions,
            body: JSON.stringify({ error: `Failed to fetch rooms.`})
        };
    }
}