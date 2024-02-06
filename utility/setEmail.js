const firebaseAdminConfig = require("../config/firebaseAdminConfig")

const setEmail = async (email, uid) => {
    console.log(uid);
    console.log(email);
    try {
      await firebaseAdminConfig.auth.updateUser(uid, { email: email });
      const user = await firebaseAdminConfig.auth.getUser(uid);

      return user
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = setEmail;