const firebaseAdminConfig = require("../config/firebaseAdminConfig")

const getDate = (timestamp) => {
    const MONTHS = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      
      
    const date = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1e6);

    const day = DAYS[date.getDay()]
    const month = MONTHS[date.getMonth()]

    return `${day}, ${date.getDate()}th ${month}, ${date.getFullYear()}`
}

const getBookingSummary = async (studentID) => {

    let studentRef = firebaseAdminConfig.db.collection("students").doc(studentID)

    try {
        const student = await studentRef.get()
        if (student.exists) {
            return {
                bookingDate: getDate(student.data().bookingDate),
                amountPaid: student.data().amountPaid,
                paymentDeadline: getDate(student.data().paymentDeadline),
            }
        } else {
            throw new Error('Student doesnt exists.')
        }
    } catch (error) {
        return {error: `${error}`}
    }
}

module.exports = getBookingSummary