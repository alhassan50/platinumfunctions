const getMessage = (message, phoneNumber, email, fullName) => {
    return `FROM WEBSITE'S CONTACT FORM\n----------------------------------\nMessage: ${message}\n\nFull Name: ${fullName}\nPhone Number: ${phoneNumber}\nEmail: ${email}`
}

module.exports = getMessage