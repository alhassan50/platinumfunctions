const validation = require("./validation");

const validateProfileInfo = (profileInfo) => {
    console.log(profileInfo);

    const validFields = ['fullName', 'course', 'phoneNumber', 'level'];

    if (Object.keys(profileInfo).length === 0) {
        console.log('Profile info is empty');
        return { isValid: false };
    }

    // Check for invalid fields
    for (const field in profileInfo) {
        if (!validFields.includes(field)) {
            console.log(field);
            return { isValid: false };
        }
    }

    let validProfileInfo = {};

    // Validate each specific field
    if (profileInfo.fullName) {
        const validationResult = validation.validateFullName(profileInfo.fullName);
        if (validationResult) {
            return { isValid: false };
        }
        validProfileInfo['displayName'] = profileInfo.fullName;
    }

    if (profileInfo.phoneNumber) {
        const validationResult = validation.validatePhoneNumber(profileInfo.phoneNumber);
        if (validationResult) {
            return { isValid: false };
        }
        validProfileInfo['phoneNumber'] = profileInfo.phoneNumber;
    }

    if (profileInfo.course) {
        const validationResult = validation.validateCourse(profileInfo.course);
        if (validationResult) {
            return { isValid: false };
        }
        validProfileInfo['course'] = profileInfo.course;
    }

    if (profileInfo.level) {
        const validationResult = validation.validateLevel(profileInfo.level);
        if (validationResult) {
            return { isValid: false };
        }
        validProfileInfo['level'] = profileInfo.level;
    }

    // If all checks pass, return a success indicator
    return { isValid: true, validProfileInfo: validProfileInfo };
};

module.exports = validateProfileInfo;
