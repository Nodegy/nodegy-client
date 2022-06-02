import { errorHandler } from '../_utils/index';
import config from "@/config/config";
const API_URL = config.API_URL;
import { handlePayload } from './_helpers/index';
let source;
import store from '@/store/index';

class SseHandlerService {
    async init() {
        //TODO: ADD config.WS_URL to FE build stage
        const wsUri = config.WS_URL + `?eid=${store.state.auth.user.eid}`;

        try {
            // source = config.DEPLOY_ENV === 'production' ? new WebSocket(wsUri) : source = new EventSource(API_URL + 'initializesseevents', { withCredentials: true });;
            source = new WebSocket(wsUri);

            source.onmessage = function (res) {
                // res = JSON.parse(res.data);
                // handlePayload(res);
                console.log('incoming message: ', res);
            };

            source.onopen = function (event) {
                console.log('CONNECTED');
            }

            source.onclose = function (event) {
                console.log('DISCONNECTED');
            }

            source.onerror = function (event) {
                console.log('ERROR: ', event)
            }
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