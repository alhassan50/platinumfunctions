const axios = require('axios');

const verifyPassword = async (email, currentPassword) => {
    console.log(currentPassword);
    console.log(email);

    try {
        const apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_WEB_API_KEY}`;
        
        const response = await axios.post(apiUrl, {
            email,
            password: currentPassword,
            returnSecureToken: true,
        });

        const { idToken } = response.data;

        console.log(idToken);
    } catch (error) {
        throw error;
    }
};

module.exports = verifyPassword;
