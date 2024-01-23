const formatPhoneNumber = (phoneNumber, countryCode) => {
    const sanitizedNumber = phoneNumber.replace(/^0+/, ''); // Remove leading '0'
    return `+${countryCode}${sanitizedNumber}`;
};

module.exports = formatPhoneNumber;