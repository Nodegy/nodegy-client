import store from '@/store/index';
import { createMessage, determineShouldSend } from './_helpers/index';

export default async (isErr, payload, res, requestType, service) => {
    service = service.toLowerCase();
    requestType = requestType.toLowerCase();

    if (!(Object.keys(res).includes('data') && Object.keys(res.data).includes('details'))) {
        return;
    };
    const shouldSend = isErr ? true : determineShouldSend(payload, service);
    if (shouldSend) {
        let notification = res.data.details;
        const message = createMessage(isErr, requestType, service);
        notification.message = isErr ? message + ' ' + notification.message : message;
        await store.dispatch('notification/addRequestResponse', notification);
    };
};