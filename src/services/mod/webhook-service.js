import axios from 'axios';
const API_URL = process.env.VUE_APP_API_URL + 'mod/webhook/';

class ModWebhookService {

    getAllWebhooks() {
        return axios
            .get(API_URL + `findall`);
    };

    create(eid, webhook) {
        return axios
            .post(API_URL + `create/${eid}`, webhook);
    };
};

export default new ModWebhookService();