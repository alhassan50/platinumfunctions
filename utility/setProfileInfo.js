const firebaseAdminConfig = require("../config/firebaseAdminConfig")
const formatPhoneNumber = require("./formartPhoneNumber");

const createStudentAccount = async (validProfileData, uid) => {
    try {
      const userRecord = await firebaseAdminConfig.auth.updateUser(
        uid,
        {
            ...validProfileData
        }
      );
      return userRecord
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = createStudentAccount;