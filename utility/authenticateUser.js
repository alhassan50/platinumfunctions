const firebaseAdminConfig = require("../config/firebaseAdminConfig");

const authenticateUser = async (userTokenID) => {
  try {
    const decodedToken = await firebaseAdminConfig.auth.verifyIdToken(userTokenID);
    const uid = decodedToken.uid;
    return uid;
  } catch (error) {
    throw error;
  }
};

module.exports = authenticateUser;
