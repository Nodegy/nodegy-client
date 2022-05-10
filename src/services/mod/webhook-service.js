import axios from 'axios';
import config from "@/config/config";
const API_URL = config.API_URL + 'mod/webhook/';

class ModWebhookService {

    getAllWebhooks() {
        return axios
            .get(API_URL + 'findall');
    };

    create(eid, webhook) {
        return axios
            .post(API_URL + `create/${eid}`, webhook);
    };
};

export default new ModWebhookService();