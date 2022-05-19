import Vue from 'vue';

export const signupKeys = {
    namespaced: true,
    state: {
        keys: [],
    },

    actions: {
        init({ commit }, signupKeys) {
            commit('setSignupKeys', signupKeys);
        },

        add({ commit }, signupKey) {
            commit('add', signupKey);
        },

        delete({ commit }, keyIds) {
            commit('onDeleteSignupKeys', keyIds);
        }
    },

    mutations: {
        add(state, signupKey) {
            const idx = state.keys.findIndex(item => item._id === signupKey._id);
            let allKeys = [...state.keys];
            if (idx) {
                allKeys[idx] = signupKey;
            };
            Vue.set(state, 'keys', allKeys);
        },
        setSignupKeys(state, signupKeys) {
            state.keys = signupKeys;
        },
        onDeleteSignupKeys(state, keyIds) {
            let keysLeft = state.keys.filter(key => !keyIds.includes(key._id));
            state.keys = keysLeft;
        }
    },

    getters: {
        getSignupKeys: state => {
            return state.keys;
        },
    }

};