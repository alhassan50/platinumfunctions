const validation = require("./validation")

const validateContactFormData = (contactFormData) => {
    const {fullName, email, phoneNumber, subject, message} = contactFormData;

    const validationResults = {
        fullName: validation.validateFullName(fullName),
        email: validation.validateEmail(email),
        phoneNumber: validation.validatePhoneNumber(phoneNumber),
        subject: validation.validateSubject(subject),
        message: validation.validateMessage(message),
    };

    // Check for validation failures
    const invalidFields = Object.keys(validationResults).filter(field => validationResults[field] !== null);

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
