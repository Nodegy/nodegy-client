const { determineAlertVariant } = require('./_helpers/index');

export const notification = {
    namespaced: true,
    state: {
        requestResponses: [],
        notifications: [],
    },

    actions: {
        init({ commit }, notifications) {
            notifications = notifications.map(notification => {
                return {
                    ...notification,
                    variant: determineAlertVariant(notification.success, notification.type)
                };
            });
            commit('onSet', notifications);
        },
        add({ commit }, notification) {
            notification.variant = determineAlertVariant(notification.success, notification.type);
            commit('onAdd', notification);
        },
        addRequestResponse({ commit }, notification) {
            notification.variant = determineAlertVariant(notification.success, notification.type);
            commit('onAddRequestResponse', notification);
        },
        clear({ commit }) {
            commit('onSet', []);
        },
    },

    mutations: {
        onSet(state, notifications) {
            state.notifications = notifications.reverse();
        },
        onAdd(state, notification) {
            if (!Object.keys(notification).includes('createdAt')) {
                notification.createdAt = Date.now();
            }
            state.notifications.unshift(notification);
        },
        onAddRequestResponse(state, notification) {
            if (!Object.keys(notification).includes('createdAt')) {
                notification.createdAt = Date.now();
            }
            let rrArray = [...state.requestResponses];
            rrArray.unshift(notification);
            if (rrArray.length > 2) {
                rrArray.pop();
            };
            state.requestResponses = rrArray;
        },
    },

    getters: {
        getNotifications: state => {
            return state.notifications;
        },
        getRequestResponses: state => {
            return state.requestResponses;
        },
    },

};