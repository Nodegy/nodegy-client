import { errorHandler } from '../_utils/index';
import config from "@/config/config";
// const API_URL = process.env.NODE_ENV === 'production' ? config.WH_URL : config.API_URL;
const API_URL = config.API_URL;
let source;
import { handlePayload } from './_helpers/index';

class SseHandlerService {
    async init() {
        try {
            source = new EventSource(API_URL + 'initializesseevents', { withCredentials: true });
            source.onmessage = function (res) {
                res = JSON.parse(res.data);
                handlePayload(res);
            };
        } catch (err) {
            await errorHandler('SSE Handler', 'init', err);
        };
    };

    close() {
        if (source) {
            source.close();
        };
    };
};

export default new SseHandlerService();