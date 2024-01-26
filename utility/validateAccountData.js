const validation = require("./validation")

const validateAccountData = (accountData) => {
    /* console.log("logging accountData");
    console.log(accountData); // Log the entire object
    console.log("done logging accountData"); */

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

    // Log individual properties
    /* console.log("fullName:", fullName);
    console.log("email:", email);
    console.log("phoneNumber:", phoneNumber);
    console.log("password:", password);
    console.log("confirmPassword:", confirmPassword);
    console.log("course:", course);
    console.log("level:", level);
    console.log("gender:", gender);
    console.log("hostelLocation:", hostelLocation);
    console.log("roomType:", roomType); */

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
        roomPrice: validation.validateRoomPrice(roomPrice), //done
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

module.exports = validateAccountData
