import axios from '@/axios';
import config from "@/config/config";
const API_URL = config.API_URL + 'site/error';

export default async (service, func, err, payload) => {
    try {
        const errPayload = {
            service: service,
            function: func,
            message: err.message,
            payload: payload ? payload : {},
            stack: err.stack
        };

        if (process.env.NODE_ENV === 'development') {
            console.log('Error: ', errPayload, { err });
        };
        if (config.LOG_ERRORS_TO_DB) {
            await axios.post(API_URL, errPayload);
        };

    } catch (err) {
        // console.log('err in errorHandler: ', err);
    };
};