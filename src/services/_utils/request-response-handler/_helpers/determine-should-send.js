module.exports = (payload, service) => {
    let shouldSend = true;
    const payloadKeys = Object.keys(payload);
    switch (service) {
        case 'strategy':
            if (payloadKeys.length == 2 && payloadKeys.includes('_id') && payloadKeys.includes('conditionsReady')) {
                shouldSend = false;
            };
            break;
        case 'user':
            if (payloadKeys.length == 1 && payloadKeys.includes('preferences')) {
                shouldSend = false;
            };
            break;
        default:
            break;
    };
    return shouldSend;
};