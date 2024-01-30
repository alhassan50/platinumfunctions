const firebaseAdminConfig = require("../config/firebaseAdminConfig")
const getStudent = require("./getStudent")

const getStudentRoom = async (studentID) => {
    try {
        const student = await getStudent(studentID);
        return student.roomID
    } catch (error) {
        return {error: `${error}`}
    }
}

module.exports = getStudentRoom