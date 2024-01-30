const validation = require("./validation")

const validateAvailableRoomsParams = (hostelLocation, roomType, gender) => {
    const validationResults = {
        hostelLocation : validation.validateHostelLocation(hostelLocation),
        roomType : validation.validateRoomType(roomType),
        gender : validation.validateGender(gender)
    }

    const invalidParams = Object.keys(validationResults).filter(params => validationResults[params] !== null);

    if (invalidParams.length > 0) {
        return {
            isValid: false,
            errors: validationResults,
            invalidParams,
        };
    }

    return {isValid: true}
}

module.exports = validateAvailableRoomsParams