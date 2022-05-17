import config from "@/config/config";
const cycleInSeconds = config.SECONDS_CYCLE;
const maxRequestsPerCycle = config.REQUEST_LIMIT_PER_CYCLE;

export const requestLimiter = {
    namespaced: true,
    state: {
        numberOfRequests: 0,
        requestsAllowed: true,
        moduleIntervalActive: false,
    },

    actions: {
        documentRequest({ state, commit }) {
            commit('toggleRequestsAllowed');
            commit('setModuleInterval');
            if (state.requestsAllowed) {
                commit('incrementNumberOfRequests');
                commit('setComponentTimer');
            };
        },
    },

    mutations: {
        incrementNumberOfRequests(state) {
            state.numberOfRequests += 1;
        },
        setComponentTimer(state) {
            const timerId = setTimeout(() => {
                state.numberOfRequests -= 1;
                clearTimeout(timerId);
            }, cycleInSeconds * 1000);
        },
        setModuleInterval(state) {
            if (!state.moduleIntervalActive) {
                state.moduleIntervalActive = true;
                const intervalId = setInterval(() => {
                    this.commit('requestLimiter/toggleRequestsAllowed');
                    if (state.requestsAllowed) {
                        state.moduleIntervalActive = false;
                        clearInterval(intervalId);
                    };
                }, 1000);
            }
        },
        toggleRequestsAllowed(state) {
            state.requestsAllowed = state.numberOfRequests < maxRequestsPerCycle;
        }
    },

    getters: {
        getRequestsAllowed: state => () => {
            return state.requestsAllowed;
        },
    }
};