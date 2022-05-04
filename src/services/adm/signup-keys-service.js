import { errorHandler, requestHandler } from '../_utils/index';
import store from "@/store/index";
const address = 'adm/signupkeys/';
const service = 'Admin Signup Keys';

class AdmSignupKeysService {

    async delete(keyIds) {
        try {
            const payload = {
                _ids: keyIds
            };
            const res = await requestHandler(
                service,
                'patch',
                address + 'delete',
                payload
            );

            if (res) {
                await store.dispatch('signupKeys/delete', keyIds);
                return Promise.resolve(res);
            };
        } catch (err) {
            await errorHandler(service, 'delete', err);
            return Promise.reject(err);
        }
    };

    async generateSignupKeys(numKeys) {
        try {
            const payload = {
                generateSignupKeys: true,
                total: numKeys
            };
            const res = await requestHandler(
                service,
                'patch',
                address + 'generate',
                payload
            );

            if (res) {
                await store.dispatch('signupKeys/init', res.data.payload);
                return Promise.resolve(res);
            };
        } catch (err) {
            await errorHandler(service, 'generate', err);
            return Promise.reject(err);
        }
    };

    async getSignupKeys() {
        try {
            const res = await requestHandler(
                service,
                'get',
                address + 'getall'
            );

            if (res) {
                await store.dispatch('signupKeys/init', res.data.payload);
            };
        } catch (err) {
            await errorHandler(service, 'getAll', err);
            return Promise.reject(err);
        }
    };

};

export default new AdmSignupKeysService();