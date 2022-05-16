import axios from '@/axios';
import config from "@/config/config";
const API_URL = config.API_URL + 'auth/verification/';

class EmailService {

    checkEmailExists(email) {
        return axios
            .patch(API_URL + 'checkemailexists', {
                email: email,
            }, { withCredentials: false });
    };

    sendVCode(email, oldEmail) {
        return axios
            .patch(API_URL + 'sendverificationemail', {
                email: email,
                oldEmail: oldEmail
            });
    };

    sendPwResetVCode(email) {
        return axios
            .patch(API_URL + 'sendpwresetvcode', {
                email: email,
            }, { withCredentials: false });
    };

};

export default new EmailService();

//TODO: Check routes!