import { errorHandler, requestHandler } from '../_utils/index';
import store from "@/store/index";

const address = 'notification/';
const service = 'Notification';

class NotificationService {
    async deleteAll() {
        try {
            await requestHandler(
                service,
                'deleteall',
                address
            );

            await store.dispatch('notification/clear');

            return Promise.resolve();
        } catch (err) {
            await errorHandler(service, 'deleteall', err);
            return Promise.reject(err)
        };
    };

};

export default new NotificationService();
