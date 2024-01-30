const firebaseAdminConfig = require("../config/firebaseAdminConfig")
const getDate = require("./getDate")

const getPaymentDetails = async (studentID) => {
    let studentRef = firebaseAdminConfig.db.collection("students").doc(studentID)

    try {
        const student = await studentRef.get()
        if (student.exists) {
            return {
                roomPrice: student.data().roomPrice,
                roomType: student.data().roomType,
                amountPaid: student.data().amountPaid,
                amountRemaining: student.data().amountRemaining,
                paymentDeadline: getDate(student.data().paymentDeadline),
                paymentHistory: student.data().paymentHistory
            }
        } else {
            throw new Error('Student doesnt exists.')
        }
    } catch (error) {
        return {error: `${error}`}
    }
}

module.exports = getPaymentDetails