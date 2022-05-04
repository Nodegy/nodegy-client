import Vue from "vue";

export const stratStore = {
    namespaced: true,
    state: {
        alerts: null,
        strategies: null,
        webhooks: null
    },
    actions: {
        init({ commit }, data) {
            commit('setAlerts', data.alerts);
            commit('setStrategies', data.strategies);
            commit('setWebhooks', data.webhooks);
        },

        add({ commit, dispatch }, { key, item }) {
            dispatch('selected/setIsLoading', true, { root: true });
            commit('add', { key: key, item: item });
            process.nextTick(() => {
                dispatch('selected/setIsLoading', false, { root: true });
            });
        },

        deleteAlert({ state, commit }, id) {
            commit('delete', { key: 'alerts', id: id });
            const strategies = [...state.strategies];
            strategies.forEach(strategy => {
                strategy.alerts.forEach((alert, idx) => {
                    if (alert._id === id) {
                        strategy.alerts.splice(idx, 1);
                    };
                });
            });
            commit('setStrategies', strategies);
        },

        updateAlerts({ state, commit }, { alert, isNew }) {
            commit('onUpdate', { key: 'alerts', item: alert, isNew: isNew });
            state.strategies.forEach(strategy => {
                strategy.alerts.forEach((existingAlert, idx) => {
                    if (existingAlert._id == alert._id) {
                        strategy.alerts[idx] = alert;
                        commit('onUpdate', { key: 'strategies', item: strategy, isNew: false });
                    };
                });
            });
        },

        deleteStrategy({ commit }, id) {
            commit('delete', { key: 'strategies', id: id })
        },

        updateStrategies({ commit }, { isNew, strategy }) {
            commit('onUpdate', { key: 'strategies', item: strategy, isNew: isNew });
        },

        deleteWebhook({ commit }, id) {
            commit('delete', { key: 'webhooks', id: id });
        },

        deleteAllWebhooks({ commit }) {
            commit('deleteAll', { key: 'webhooks' });
        },

        externalUpdate({ commit, dispatch }, { isNew, item, key }) {
            dispatch('selected/setIsLoading', true, { root: true });
            commit('onUpdate', { key: key, item: item, isNew: isNew });
            dispatch('selected/reselectAll', ['strategies'], { root: true });
            process.nextTick(() => {
                dispatch('selected/setIsLoading', false, { root: true });
            });
        },
    },

    mutations: {
        add(state, { key, item }) {
            state[key].push(item);
        },

        setAlerts(state, alerts) {
            Vue.set(state, 'alerts', [...alerts]);
        },

        setStrategies(state, strategies) {
            Vue.set(state, 'strategies', [...strategies]);
        },

        setWebhooks(state, webhooks) {
            Vue.set(state, 'webhooks', [...webhooks]);
        },

        onUpdate(state, { key, item, isNew }) {
            if (isNew) {
                state[key].unshift(item);
            } else {
                const idx = state[key].findIndex((arrayItem) => item._id === arrayItem._id);
                Object.keys(item).forEach(objKey => {
                    state[key][idx][objKey] = item[objKey]
                });
            };
        },

        delete(state, { key, id }) {
            const data = [...state[key]]
            const idx = data.findIndex((arrayItem) => id === arrayItem._id);
            data.splice(idx, 1);
            Vue.set(state, key, data);
        },

        deleteAll(state, { key }) {
            Vue.set(state, key, []);
        },

    },

    getters: {
        getAlerts: state => {
            return [...state.alerts].reverse();
        },

        getStrategies: state => {
            return [...state.strategies].reverse();
        },

        getWebhooks: state => {
            return [...state.webhooks].reverse();
        },

        allAlertNames: state => {
            return state.alerts.map((alert) => {
                return alert.name;
            });
        },

        allStratNames: state => {
            return state.strategies.map((strat) => {
                return strat.name;
            });
        },

        getStratNameFromId: state => (id) => {
            const strategy = state.strategies.filter(strategy => strategy._id == id);
            return strategy.length ? strategy[0].name : '- deleted -';
        },

        findAlerts: state => (ids) => {
            let res = [];
            state.alerts.forEach(alert => {
                if (ids.includes(alert._id)) {
                    res.push({ ...alert })
                };
            });
            return res;
        },

        findSelected: state => (key, item) => {
            return state[key].filter(i => i === item || Object.keys(i).includes('_id') && i._id === item._id)[0];
        },

    },

};