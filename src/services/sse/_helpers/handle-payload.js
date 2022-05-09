import store from '@/store/index.js';
import { mapGetters } from 'vuex';
mapGetters({
    findAlerts: 'stratStore/findAlerts',
});

export default async (res) => {
    const details = res.details;
    const payload = res.payload;
    const service = details.service;

    switch (true) {
        case service.includes('incoming webhook'):
            handleIncomingWebhook(payload.notifications, payload.strategy, payload.webhook);
            break;
        default:
            store.dispatch('notification/add', details);
            break;
    };
};

const handleIncomingWebhook = (notifications, strategy, webhook) => {
    strategy.alerts = store.getters['stratStore/findAlerts'](strategy.alerts);
    store.dispatch('stratStore/add', { key: 'webhooks', item: webhook });
    store.dispatch('stratStore/externalUpdate', { isNew: false, item: strategy, key: 'strategies' });
    notifications.forEach(notification => {
        store.dispatch('notification/add', notification);
    });
};