import { errorHandler, requestHandler } from '../_utils/index';
const address = 'auth/mailinglist/';
const service = 'Mailing List';

class MailingListService {
    async add(email) {
        try {
            const payload = {
                email: email,
            };

            const res = await requestHandler(
                service,
                'post',
                address + 'add',
                payload
            );

            if (res) {
                return Promise.resolve(res);
            };
        } catch (err) {
            await errorHandler(service, 'create', err);
            return Promise.reject(err);
        };
    };
};

export default new MailingListService();