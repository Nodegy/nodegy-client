export default () => {
    let result = ""
    const timezone = new Date().toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1];
    for (let char of timezone) {
        if (char === " ") {
            break;
        } else {
            result += char
        };
    };
    return result;
};