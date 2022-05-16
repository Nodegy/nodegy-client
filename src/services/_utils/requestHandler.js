import axios from '@/axios';
import errorHandler from './errorHandler';
import requestResponseHandler from './request-response-handler/requestResponseHandler';
import config from "@/config/config";
const API_URL = config.API_URL;
// const API_URL = '/api/'

const handleRequest = async (service, requestType, address, payload) => {
    payload = payload ? payload : {};
    let requestAddress;

    const requestTypeKeysWithAddress = ['get', 'post', 'patch'];
    switch (true) {
        case service == 'Webhook':
        case requestTypeKeysWithAddress.includes(requestType):
            requestAddress = API_URL + address;
            break;
        default:
            requestAddress = API_URL + address + requestType;
            break;
    };
    let res;
    try {
        switch (requestType) {
            case 'create':
            case 'post':
                res = await axios.post(requestAddress, payload);
                break;
            case 'delete':
            case 'deleteone':
            case 'deleteall':
                res = await axios.delete(requestAddress);
                break;
            case 'get':
                res = await axios.get(requestAddress, payload);
                break;
            case 'patch':
            case 'update':
            case 'updateactivedata':
            case 'verify':
                res = await axios.patch(requestAddress, payload);
                break;
            default:
                await errorHandler(service, 'handleRequest', 'invalid request type');
                break;
        };
        await requestResponseHandler(false, payload, res, requestType, service);
        return res;
    } catch (err) {
        await requestResponseHandler(true, payload, err.response, requestType, service);
        await errorHandler(service, 'handleRequest', err);
        return err;
    };
};

const handleNetworkError = async (requestType, address, payload) => {
    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    let attempts = 0;
    let res;
    const maxAttempts = config.REQUEST_RETRIES;

    while (attempts < maxAttempts) {
        await sleep(2000);
        res = await handleRequest(requestType, address, payload);
        attempts += 1;

        if (!res.status == 503) {
            attempts = maxAttempts;
            return Promise.resolve(res);

        } else if (attempts == maxAttempts) {
            return Promise.reject(res);
        };
    };
};

export default async (service, requestType, address, payload) => {
    let res = await handleRequest(service, requestType, address, payload);
    if (res && (res.isAxiosError || res.stack)) {
        if (res.status == 503) {
            try {
                res = await handleNetworkError(requestType, address, payload);
            } catch (err) {
                return Promise.reject(err);
            };
        } else {
            return Promise.reject(res);
        };
    };
    return Promise.resolve(res);
};