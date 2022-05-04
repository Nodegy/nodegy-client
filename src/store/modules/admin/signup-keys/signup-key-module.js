export const signupKeys = {
    namespaced: true,
    state: {
        keys: [],
    },

    actions: {
        init({ commit }, signupKeys) {
            commit("setSignupKeys", signupKeys);
        },

        delete({ commit }, keyIds) {
            commit("onDeleteSignupKeys", keyIds);
        }
    },

    mutations: {
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