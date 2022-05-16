import axios from '@/axios';
import config from "@/config/config";
const API_URL = config.API_URL + 'mod/user/';

class ModUserService {

    getAllUserInfo() {
        return axios.get(API_URL + 'findall');
    };

    create(user) {
        return axios.post(API_URL + 'create', user);
    };

    updateUserName(uid, updatedUserName) {
        return axios
            .patch(API_URL + 'update', {
                uid: uid,
                username: updatedUserName
            });
    };

    updateUserEmail(uid, updatedEmail) {
        return axios
            .patch(API_URL + 'update', {
                uid: uid,
                email: updatedEmail
            });
    };

    delete(uid) {
        return axios.delete(API_URL + `delete/${uid}`);
    };

};

export default new ModUserService();