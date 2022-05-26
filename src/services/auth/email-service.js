import axios from '@/axios';
import config from "@/config/config";
import { errorHandler } from '@/services/_utils/index';
const API_URL = config.API_URL + 'auth/verification/';

class EmailService {

    async checkEmailExists(email) {
        try {
            return await axios
                .patch(API_URL + 'checkemailexists', {
                    email: email,
                }, { withCredentials: false });
        } catch (err) {
            await errorHandler('Email-service', 'checkEmailExists', err);
            return Promise.reject();
        }
    };

    async sendVCode(email, oldEmail) {
        try {
            return axios
                .patch(API_URL + 'sendverificationemail', {
                    email: email,
                    oldEmail: oldEmail
                });
        } catch (err) {
            await errorHandler('Email-service', 'sendVCode', err);
            return Promise.reject();
        }
    };

    async sendPwResetVCode(email) {
        try {
            return axios
                .patch(API_URL + 'sendpwresetvcode', {
                    email: email,
                }, { withCredentials: false });
        } catch (err) {
            await errorHandler('Email-service', 'sendPwResetVCode', err);
            return Promise.reject();
        }
    };
};

export default new EmailService();