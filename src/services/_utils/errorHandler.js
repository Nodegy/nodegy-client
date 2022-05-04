import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL + 'site/error';

export default async (service, func, err) => {
    try {
        const payload = {
            service: service,
            function: func,
            message: err.message,
            stack: err.stack
        };

        if (process.env.NODE_ENV === 'development') {
            console.log('Error: ', payload, { err });
        };
        if (process.env.VUE_APP_LOG_ERRORS_TO_DB === 'true') {
            await axios.post(API_URL, payload);
        };

    } catch (err) {
        console.log('err in errorHandler: ', err);
    };
};