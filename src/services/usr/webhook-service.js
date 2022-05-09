import { errorHandler, requestHandler } from '../_utils/index';
import store from '@/store/index';
import Webhook from '@/models/webhook';
const address = 'usr/webhook/';
const service = 'Webhook';

class WebhookService {
    async create(conditions, eid, stratId, symbol) {
        try {
            const payload = new Webhook(stratId, conditions, eid, symbol).getPayload();
            const res = await requestHandler(
                service,
                'create',
                'wh/' + eid,
                payload
            );
            return Promise.resolve(res);
        } catch (err) {
            await errorHandler(service, 'create', err);
            return Promise.reject(err);
        };
    };

    async deleteOne(webhookId, cid) {
        try {
            const res = await requestHandler(
                service,
                'deleteone',
                address + 'deleteone/' + webhookId,
            );
            if (res) {
                await store.dispatch('stratStore/deleteWebhook', webhookId);
                await store.dispatch('selected/setSelected', { item: null, cid: cid });
                return Promise.resolve(true);
            };
        } catch (err) {
            await errorHandler(service, 'deleteOne', err);
            return Promise.reject(err);
        };
    };

    async deleteAll(cid) {
        try {
            const res = await requestHandler(
                service,
                'deleteall',
                address + 'deleteall',
            );
            if (res) {
                await store.dispatch('stratStore/deleteAllWebhooks');
                await store.dispatch('selected/setSelected', { item: null, cid: cid });
                return Promise.resolve(true);
            };
        } catch (err) {
            await errorHandler(service, 'deleteAll', err);
            return Promise.reject(err);
        };
    };
};

export default new WebhookService();