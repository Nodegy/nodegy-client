import { errorHandler, requestHandler } from '../_utils/index';
import store from '@/store/index';

const address = 'usr/alert/';
const service = 'Alert';

class AlertService {
    async create(alert, cid) {
        try {
            const payload = {
                address: alert.address,
                messages: alert.messages,
                name: alert.name,
                notes: alert.notes,
                type: alert.type
            };

            const res = await requestHandler(
                service,
                'create',
                address,
                payload
            );

            if (res) {
                alert = res.data.payload;
                await store.dispatch('stratStore/add', { key: 'alerts', item: alert });
                await store.dispatch('selected/setSelected', { item: alert, cid: cid });
                return Promise.resolve(alert);
            };
        } catch (err) {
            await errorHandler(service, 'create', err);
            return Promise.reject(err);
        };
    };

    async update(_id, changes, cid) {
        try {
            const payload = {
                _id: _id, ...changes
            };

            const res = await requestHandler(
                service,
                'update',
                address,
                payload
            );

            if (res) {
                const alert = res.data.payload;
                await store.dispatch('stratStore/updateAlerts', { alert: alert, isNew: false });
                await store.dispatch('selected/setSelected', { item: alert, cid: cid });
                return Promise.resolve(alert);
            };
        } catch (err) {
            await errorHandler(service, 'update', err);
            return Promise.reject(err);
        };
    };

    async delete(alertId, cid) {
        try {
            const res = await requestHandler(
                service,
                'delete',
                address,
                alertId
            );

            if (res) {
                await store.dispatch('stratStore/deleteAlert', alertId);
                await store.dispatch('selected/setSelected', { item: null, cid: cid });
                return Promise.resolve(res.data.payload);
            };
        } catch (err) {
            await errorHandler(service, 'delete', err);
            return Promise.reject(err);
        };
    };
};

export default new AlertService();