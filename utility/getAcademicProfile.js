const firebaseAdminConfig = require("../config/firebaseAdminConfig")

const getAcademicProfile = async (studentID) => {

    let studentRef = firebaseAdminConfig.db.collection("students").doc(studentID)

    try {
        const student = await studentRef.get()
        if (student.exists) {
            return {
                course: student.data().course,
                level: student.data().level,
            }
        } else {
            throw new Error('Student doesnt exists.')
        }
    } catch (error) {
        return {error: `${error}`}
    }
}

module.exports = getAcademicProfile