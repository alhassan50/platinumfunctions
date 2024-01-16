const getMessage = (message, phoneNumber, email, fullName) => {
    return `New Contact Form Submission\n---------------------------------------------------------\nMessage: ${message}\n\nFull Name: ${fullName}\nPhone Number: ${phoneNumber}\nEmail: ${email}`
}

module.exports = getMessage