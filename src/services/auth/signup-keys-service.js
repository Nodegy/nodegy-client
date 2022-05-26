import { errorHandler, requestHandler } from '../_utils/index';
const address = 'auth/signupkeys/';
const service = 'Signup Keys';

class SignupKeysService {
    async verifySignupKey(key) {
        let payload;
        try {
            payload = {
                key: key,
            };

            const res = await requestHandler(
                service,
                'verify',
                address,
                payload
            );

            if (res) {
                return Promise.resolve(res);
            };
        } catch (err) {
            await errorHandler(service, 'create', err, payload);
            return Promise.reject(err);
        };
    };
};

export default new SignupKeysService();