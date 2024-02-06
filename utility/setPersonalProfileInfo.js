const firebaseAdminConfig = require("../config/firebaseAdminConfig")
const formatPhoneNumber = require("./formartPhoneNumber");

const setPersonalProfileInfo = async (validProfileData, uid) => {
    console.log(uid);
    console.log(validProfileData);
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
  
  module.exports = setPersonalProfileInfo;