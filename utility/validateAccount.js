const firebaseAdminConfig = require("../config/firebaseAdminConfig")

const validateAccount = async (studentData, uid) => {
    console.log(studentData);
    try {  
        const userAccountRecord = await firebaseAdminConfig.auth.getUser(uid)
        let isAccountValid = true
        
        isAccountValid = isAccountValid && userAccountRecord.displayName === studentData.fullName
        isAccountValid = isAccountValid && userAccountRecord.email === studentData.email
        isAccountValid = userAccountRecord.phoneNumber !== studentData.phoneNumber

        /* if (!isAccountValid) {
            throw "Couldn't find Account"
        } */

        return isAccountValid

    } catch (error) {
        console.log(error);
        throw error
    }
    
}

module.exports = validateAccount