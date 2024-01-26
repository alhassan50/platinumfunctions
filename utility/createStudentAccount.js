const firebaseAdminConfig = require("../config/firebaseAdminConfig")
const formatPhoneNumber = require("./formartPhoneNumber");

const createStudentAccount = async (accountData) => {
    const {email, phoneNumber, password, fullName} = accountData
    //console.log(email," ", phoneNumber," ", password," ", fullName);
    try {
      const userRecord = await firebaseAdminConfig.auth.createUser(
            {
                email: email,
                //phoneNumber: phoneNumber, 
                phoneNumber: formatPhoneNumber(phoneNumber, '233'),
                password: password,
                displayName: fullName
            }
        );

      const uid = userRecord.uid
      const customToken = await firebaseAdminConfig.auth.createCustomToken(uid)
      return {customToken: customToken, uid: uid};
    } catch (error) {
      //console.log("::::::", error);
      throw error;
    }
  };
  
  module.exports = createStudentAccount;