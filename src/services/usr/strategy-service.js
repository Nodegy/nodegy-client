import { errorHandler, requestHandler } from '../_utils/index';
import store from '@/store/index';
const address = 'usr/strategy/';
const service = 'Strategy';

class StrategyService {
    async create(strategy, cid) {
        let payload;
        try {
            payload = strategy.getPreparedStrategy();
            const res = await requestHandler(
                service,
                'create',
                address,
                payload
            );

            if (res) {
                const alerts = [...strategy.alerts];
                strategy = res.data.payload;
                strategy.alerts = alerts;
                await store.dispatch('stratStore/add', { key: 'strategies', item: strategy });
                await store.dispatch('selected/setSelected', { item: strategy, cid: cid });
                return Promise.resolve(true);
            };
        } catch (err) {
            await errorHandler(service, 'create', err, payload);
            return Promise.reject();
        };
    };

    async update(changes, inputStrat, cid) {
        let payload;
        try {
            payload = {
                _id: inputStrat._id,
                ...inputStrat.getChanges(changes)
            };
            const res = await requestHandler(
                service,
                'update',
                address,
                payload
            );
            if (res) {
                let strategy = res.data.payload;
                strategy.alerts = inputStrat.alerts;
                await store.dispatch('stratStore/updateStrategies', { strategy: strategy, isNew: false });
                await store.dispatch('selected/setSelected', { item: strategy, cid: cid });
                return Promise.resolve(true);
            };
        } catch (err) {
            await errorHandler(service, 'update', err, payload);
            return Promise.reject();
        }

    };

    async updateActiveDetails(changes, inputStrat, cid) {
        let payload = { _id: inputStrat._id, ...changes };
        try {
            const res = await requestHandler(
                service,
                'update',
                address,
                payload
            );

            if (res) {
                let strategy = res.data.payload;
                strategy.alerts = inputStrat.alerts;
                await store.dispatch('stratStore/updateStrategies', { strategy: strategy, isNew: false });
                await store.dispatch('selected/setSelected', { item: strategy, cid: cid });
                return Promise.resolve(true);
            };

        } catch (err) {
            await errorHandler(service, 'update', err, payload);
            return Promise.reject();
        };
    };

    async delete(stratId, cid) {
        try {
            const res = await requestHandler(
                service,
                'delete',
                address,
                stratId
            );

            if (res) {
                await store.dispatch('stratStore/deleteStrategy', stratId);
                await store.dispatch('selected/setSelected', { item: null, cid: cid });
                return Promise.resolve(res.data.payload);
            };
        } catch (err) {
            await errorHandler(service, 'delete', err, { _id: stratId });
            return Promise.reject();
        };
    };
};

export default new StrategyService();
