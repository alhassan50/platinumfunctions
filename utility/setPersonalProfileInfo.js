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

      // Reload the user to ensure the client-side user object is updated
      const user = await firebaseAdminConfig.auth.getUser(uid);

      return user
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = setPersonalProfileInfo;