const firebaseAdminConfig = require("../config/firebaseAdminConfig")
const getRoom = require("../utility/getRoom")

const addStudent = async (studentData, uid) => {
    try {
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
            paymentDeadline: new Date(),
            /* paymentDeadline: new Date('2024-02-01').getTime(), */
            roomID: roomID
        };

        console.log("STUDENT UID:::::::: ", uid);
        console.log("STUDENT DATA:::::::: ", studentData);

        const studentDocRef = studentCollection.doc(uid);

        console.log('setting user............');
        studentDocRef.set(studentFirestoreData)
        console.log('done setting user...................');
    } catch (error) {
        console.log(error);
        throw error
    }
}

module.exports = addStudent