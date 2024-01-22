const firebaseAdminConfig = require("../config/firebaseAdminConfig")

const getStudent = async (studentID) => {

    let studentRef = firebaseAdminConfig.db.collection("student").doc(studentID)

    try {
        const student = await studentRef.get()
        if (student.exists) {
            return student.data()
        } else {
            throw new Error('student doesnt exists.')
        }
    } catch (error) {
        return {error: `${error}`}
    }
}

module.exports = getStudent