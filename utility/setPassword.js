const firebaseAdminConfig = require("../config/firebaseAdminConfig")

const setPassword = async (newPassword, uid) => {
    console.log(newPassword);
    console.log(uid);
    try {
      await firebaseAdminConfig.auth.updateUser(uid, { password: newPassword });
      const user = await firebaseAdminConfig.auth.getUser(uid);
    
      return user
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = setPassword;