const firebaseAdminConfig = require("../config/firebaseAdminConfig")
const formatPhoneNumber = require("./formartPhoneNumber");

const createStudentAccount = async (accountData) => {
    const {email, phoneNumber, password, fullName} = accountData
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
      return {uid: uid};
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = createStudentAccount;