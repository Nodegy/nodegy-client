import axios from 'axios';
import config from "@/config/config";
const API_URL = config.API_URL + 'mod/feedback/';

class ModFeedbackService {

    getAll() {
        return axios.get(API_URL + 'findall');
    };

    setHandled(feedbackId, handleStatus) {
        return axios.patch(API_URL + 'updatehandled', {
            _id: feedbackId,
            handled: handleStatus
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                return err;
            });
    };

    delete(feedbackId) {
        return axios.delete(API_URL + `deleteone/${feedbackId}`);
    };

}

export default new ModFeedbackService();