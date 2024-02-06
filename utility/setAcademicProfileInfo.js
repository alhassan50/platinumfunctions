const firebaseAdminConfig = require("../config/firebaseAdminConfig")

const setAcademicProfileInfo = async (validProfileData, uid) => {
    console.log(uid);
    console.log(validProfileData);
    try {
      let studentRef = firebaseAdminConfig.db.collection("students").doc(uid)
      await studentRef.update({
        ...validProfileData
      })
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = setAcademicProfileInfo;