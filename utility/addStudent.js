const firebaseAdminConfig = require("../config/firebaseAdminConfig")

const addStudent = async (studentData, uid) => {
    try {
        const {gender, roomID, level, course, roomPrice, roomType} = studentData
    
        const studentCollection = firebaseAdminConfig.db.collection('students')
    
        const studentFirestoreData = {
            gender: gender,
            roomID: roomID,
            level: level,
            course: course,
            amountPaid: 0,
            amountRemaining: roomPrice,
            roomPrice: roomPrice,
            roomType: roomType,
            bookingDate: new Date(),
            paymentDeadline: new Date(),
            paymentHistory: []
            /* paymentDeadline: new Date('2024-02-01').getTime(), */
        };

        const studentDocRef = studentCollection.doc(uid);
        await studentDocRef.set(studentFirestoreData)
    } catch (error) {
        console.log(error);
        throw error
    }
}

module.exports = addStudent