export const initApp = {
    namespaced: true,
    state: {
        appReady: false
    },

    actions: {
        initApp({ commit }, isReady) {
            commit('readyApp', isReady);
        },
    },

    mutations: {
        readyApp(state, isReady) {
            state.appReady = isReady;
        },
    },

    getters: {
        getIsAppReady: state => {
            return state.appReady;
        }
    }

};