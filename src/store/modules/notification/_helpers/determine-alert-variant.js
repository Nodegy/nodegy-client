module.exports = (success, type) => {
    let variant = success ? null : 'danger';

    if (!variant) {
        switch (type) {
            case 'action':
                variant = 'success';
                break;
            case 'incoming':
                variant = 'info';
                break;
            case 'outgoing':
                variant = 'success';
                break;
            default:
                variant = null;
                break;
        };
    };

    return variant;
};