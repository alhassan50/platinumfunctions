const validation = require("./validation")

const validateContactFormData = (contactFormData) => {
    const {fullName, email, phoneNumber, subject, message} = contactFormData;

    /* console.log(fullName);
    console.log(email);
    console.log(phoneNumber);
    console.log(subject);
    console.log(message); */

    const validationResults = {
        fullName: validation.validateFullName(fullName),
        email: validation.validateEmail(email),
        phoneNumber: validation.validatePhoneNumber(phoneNumber),
        subject: validation.validateSubject(subject),
        message: validation.validateMessage(message),
    };

    /* console.log("validationResults ", validationResults); */

    // Check for validation failures
    const invalidFields = Object.keys(validationResults).filter(field => validationResults[field] !== null);

    /* console.log("invalidFields ", invalidFields); */

    console.log(validationResults);

    if (invalidFields.length > 0) {
        // Return an object with detailed error messages
        return {
            isValid: false,
            errors: validationResults,
            invalidFields,
        };
    }

    return { isValid: true };
}

module.exports = validateContactFormData
