const validator = require('email-validator');

exports.validateEmail = (email) => {
    if (email === "") {
        return "Your email is required.";
    }
    if (email.trim() === '') {
        return "Your email is needed in order to send your message.";
    }
    if (!validator.validate(email)) {
        return "Invalid email format";
    }
    return null; // Validation passed
}

exports.validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{10}$/;
    if (phoneNumber === "") {
        return null
    } else if (phoneNumber.trim() !== "" && !phoneNumberRegex.test(phoneNumber)) {
        return "Invalid phone number format";
    }
    return null; // Validation passed
}

exports.validateSubject = (subject) => {
    if (subject === "") {
        return null
    } else if (subject.trim() !== "" && subject.length > 100) {
        return "Message's subject cannot exceed 100 characters";
    }
    return null; // Validation passed
}

exports.validateFullName = (fullName) => {
    if (fullName === "" || fullName.trim() === '') {
        return "Full name cannot be empty";
    }
    if (fullName.length > 200) {
        return "Pls your full name cannot exceed 200 characters";
    }
    return null; // Validation passed
}

exports.validateMessage = (message) => {
    if (message === "" || message.trim() === '') {
        return "Message cannot be empty";
    }
    if (message.length > 500) {
        return "Message cannot exceed 500 characters";
    }
    return null; // Validation passed
}

exports.validateHostelLocation = (hostelLocation) => {
    /* if (hostelLocation == null || ) {
        return "Hostel Location is required"
    } */

    /* console.log("v: ", hostelLocation);
    console.log("hostelLocation.toLowerCase() !== 'bomso': ", hostelLocation.toLowerCase() !== 'bomso');
    console.log("hostelLocation.toLowerCase() !== 'ayeduase': ", hostelLocation.toLowerCase() !== 'ayeduase');
    console.log("hostelLocation.toLowerCase() !== 'gaza': ", hostelLocation.toLowerCase() !== 'gaza'); */

    if (
        hostelLocation == null ||
        (hostelLocation.toLowerCase() !== 'bomso' &&
         hostelLocation.toLowerCase() !== 'ayeduase' &&
         hostelLocation.toLowerCase() !== 'gaza')
    ) {
        return "Invalid hostel location.";
    }
    return null; // Validation passed
}

exports.validateRoomType = (roomType) => {
    /* console.log("v: ", roomType);
    console.log("roomType == null: ", roomType == null);
    console.log("roomType.toLowerCase() !== 'single': ", roomType.toLowerCase() !== 'single');
    console.log("roomType.toLowerCase() !== 'shared': ", roomType.toLowerCase() !== 'shared'); */

    if ( roomType == null ||
        (roomType.toLowerCase() !== 'single' && 
        roomType.toLowerCase() !== 'double' && 
        roomType.toLowerCase() !== 'shared')
    ) {
        return "Invalid room type.";
    }
    return null; // Validation passed
}

exports.validateGender = (gender) => {
    /* console.log("v: ", gender);
    console.log("gender.toLowerCase() !== 'male': ", gender.toLowerCase() !== 'male');
    console.log("gender.toLowerCase() !== 'female': ", gender.toLowerCase() !== 'female');
    console.log("(gender.toLowerCase() !== 'male' && gender.toLowerCase() !== 'female')", (gender.toLowerCase() !== 'male' && gender.toLowerCase() !== 'female')); */

    if ( gender == null ||
        (gender.toLowerCase() !== 'male' && 
        gender.toLowerCase() !== 'female')
    ) {
        return "Invalid hostel location.";
    }
    return null; // Validation passed
}


