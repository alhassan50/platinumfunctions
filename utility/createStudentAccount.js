const firebaseAdminConfig = require("../config/firebaseAdminConfig")
const formatPhoneNumber = require("./formartPhoneNumber");

const createStudentAccount = async (accountData) => {
    const {email, phoneNumber, password, fullName} = accountData
    //console.log(email," ", phoneNumber," ", password," ", fullName);
    try {
      const userRecord = await firebaseAdminConfig.auth.createUser(
            {
                email: email,
                phoneNumber: formatPhoneNumber(phoneNumber, '233'), 
                password: password,
                displayName: fullName
            }
        );

      const customToken = await firebaseAdminConfig.auth.createCustomToken(userRecord.uid)
      //const uid = userRecord.getUid();
      console.log("userRecord:::::::", userRecord);
      console.log("customToken:::::::", customToken);
      return customToken;
    } catch (error) {
      console.log("error: ", error);
      throw error;
    }
  };
  
  module.exports = createStudentAccount;