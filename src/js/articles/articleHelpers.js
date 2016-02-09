function getYear(dateString) {
    if (dateString === 'Present') {
        return dateString;
    }
    return new Date(dateString).getUTCFullYear();
}
function getYears(startDateString, endDateString) {
    return {
        startYear: getYear(startDateString),
        endYear: getYear(endDateString)
    }
}

export default {
    getYears
}
