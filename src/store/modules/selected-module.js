import Vue from "vue";

export const selected = {
    namespaced: true,
    state: {
        loading: false,
    },
    actions: {
        setSelected({ commit }, { item, cid }) {
            commit('onSetSelected', { item: item, cid: cid });
        },
        setEditing({ commit }, { item, cid }) {
            commit('onSetEditing', { item: item, cid: cid });
        },
        setValue({ commit }, { key, val, cid }) {
            commit('onSetValue', { key: key, val: val, cid: cid });
        },
        setIsLoading({ commit }, loading) {
            commit('onSetIsLoading', loading);
        },
        reselectAll({ commit, rootGetters, state }) {
            let cidName;
            let selected;
            const avoidKeys = ['loading'];
            Object.keys(state).forEach(key => {
                if (!avoidKeys.includes(key)) {
                    selected = state[key].selected;
                    cidName = key.split('-')[0].toLowerCase();
                    switch (cidName) {
                        case 'alert':
                            selected = rootGetters['stratStore/findSelected']('alerts', selected);
                            break
                        case 'strategy':
                            selected = rootGetters['stratStore/findSelected']('strategies', selected);
                            break;
                        case 'webhook':
                            selected = rootGetters['stratStore/findSelected']('webhooks', selected);
                            break;
                        default:
                            break;
                    };
                    commit('onSetSelected', { item: selected, cid: key });
                };
            });
        },
    },

    mutations: {
        onSetSelected(state, { item, cid }) {
            Vue.set(state, cid, {
                selected: item,
                unedited: null
            });
        },
        onSetEditing(state, { item, cid }) {
            Vue.set(state[cid], 'unedited', JSON.parse(JSON.stringify(item)));
            Vue.set(state[cid], 'selected', item);
        },
        onSetValue(state, { key, val, cid }) {
            Vue.set(state[cid].selected, key, val);
        },
        onSetIsLoading(state, loading) {
            Vue.set(state, 'loading', loading);
        },
    },

    getters: {
        getSelected: state => (cid) => {
            return state[cid] ? state[cid].selected : null;
        },
        getUnedited: state => (cid) => {
            return state[cid] ? JSON.parse(JSON.stringify(state[cid].unedited)) : null;
        },
        getIsLoading: state => () => {
            return state.loading;
        },
    },
};