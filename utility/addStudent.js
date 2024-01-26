const firebaseAdminConfig = require("../config/firebaseAdminConfig")
const getRoom = require("../utility/getRoom")

const addStudent = async (studentData, uid) => {
    const {gender, roomID, level, course, roomPrice} = studentData

    const studentCollection = firebaseAdminConfig.db.collection('students')

    const studentFirestoreData = {
        gender: gender,
        roomID: roomID,
        level: level,
        course: course,
        amountPaid: 0,
        amountRemaining: roomPrice,
        bookingDate: new Date(),
        paymentDeadline: new Date('2024-02-01').getTime(),
        roomID: roomID
    };

    try {
        const studentDocRef = studentCollection.doc(uid);
        studentDocRef.set(studentFirestoreData)
    } catch (error) {
        throw error
    }
}

module.exports = addStudent