const getDate = (timestamp) => {
    const MONTHS = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      
      
    const date = new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1e6);

    const day = DAYS[date.getDay()]
    const month = MONTHS[date.getMonth()]

    return `${day}, ${date.getDate()}th ${month}, ${date.getFullYear()}`
}

module.exports = getDate