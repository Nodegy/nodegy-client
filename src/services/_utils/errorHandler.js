import axios from 'axios';
import config from "@/config/config";
const API_URL = config.API_URL + 'site/error';

export default async (service, func, err) => {
    try {
        const payload = {
            service: service,
            function: func,
            message: err.message,
            stack: err.stack
        };

        if (process.env.NODE_ENV === 'development') {
            // console.log('Error: ', payload, { err });
        };
        if (config.LOG_ERRORS_TO_DB) {
            await axios.post(API_URL, payload);
        };

    } catch (err) {
        // console.log('err in errorHandler: ', err);
    };
};