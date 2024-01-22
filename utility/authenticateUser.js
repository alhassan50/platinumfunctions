const firebaseAdminConfig = require("../config/firebaseAdminConfig");

const authenticateUser = async (userTokenID) => {
  try {
    const decodedToken = await firebaseAdminConfig.auth.verifyIdToken(userTokenID);
    const uid = decodedToken.uid;
    //console.log('uid:', uid);
    return uid;
  } catch (error) {
    console.log("error: ", error);
    throw error;
  }
};

module.exports = authenticateUser;
