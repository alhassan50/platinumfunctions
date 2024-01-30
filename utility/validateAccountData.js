const validation = require("./validation")

const validateAccountData = (accountData) => {
    const {
        fullName, 
        email, 
        phoneNumber, 
        password, 
        confirmPassword, 
        course, 
        level, 
        gender, 
        hostelLocation,
        roomType,
        roomPrice
    } = accountData;

    const validationResults = {
        fullName: validation.validateFullName(fullName), //done
        email: validation.validateEmail(email), //done
        phoneNumber: validation.validatePhoneNumber(phoneNumber, true), //done
        roomType: validation.validateRoomType(roomType), //done
        password: validation.validatePassword(password, confirmPassword), //done
        course: validation.validateCourse(course),
        level: validation.validateLevel(level),
        gender: validation.validateGender(gender), //done
        hostelLocation: validation.validateHostelLocation(hostelLocation), //done
        roomType: validation.validateRoomType(roomType), //done
    };

    // Check for validation failures
    const invalidFields = Object.keys(validationResults).filter(field => validationResults[field] !== null);

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

module.exports = validateAccountData
