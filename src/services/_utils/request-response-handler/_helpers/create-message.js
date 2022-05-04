const { capFirstLetter } = require('@/helpers/index');
module.exports = (isErr, requestType, service) => {
    switch (requestType) {
        case 'create':
            requestType = isErr ? 'creating' : 'created';
            break;
        case 'delete':
            requestType = isErr ? 'deleting' : 'deleted';
            break;
        case 'deleteall':
            requestType = isErr ? 'deleting' : 'deleted';
            service += 's';
            break;
        case 'update':
            requestType = isErr ? 'updating' : 'updated';
            break;
        default:
            break;
    };
    service = capFirstLetter(service);
    return isErr
        ? `An error occured while ${requestType} ${service}. `
        : `${service} ${requestType} successfully!`;
};