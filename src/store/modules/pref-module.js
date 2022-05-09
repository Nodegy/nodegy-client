import { updateLSObj } from '../_helpers/update-ls-obj';

const inputPrefs = JSON.parse(localStorage.getItem('prefs'));
const initialState = inputPrefs
    ? inputPrefs
    : null;

export const prefs = {
    namespaced: true,
    state: initialState,
    actions: {
        init({ commit }, userPrefs) {
            try {
                commit('setTz', userPrefs.timezone);
                commit('setTimeFormat', userPrefs.timeFormat);
                commit('setTheme', userPrefs.theme);
                localStorage.setItem('prefs', JSON.stringify(userPrefs));

            } catch (err) {
                // console.log(err);
            }
        },

        async updatePref({ commit }, { key, val }) {
            try {
                switch (key) {
                    case 'timezone':
                        commit('setTz', val);
                        break;
                    case 'timeFormat':
                        commit('setTimeFormat', val);
                        break;
                    case 'theme':
                        commit('setTheme', val);
                        break;
                    default:
                        break;
                };
                updateLSObj('prefs', key, val);
                return Promise.resolve(confirm.data);


            } catch (err) {
                // console.log(`Error in updatePrefs: ${err}`);
                return Promise.reject(err);
            };
        },

        saveUsername({ commit }, { bool, un }) {
            updateLSObj('prefs', 'saveUn', { save: bool, un: un });
            commit('setSaveUsername', { save: bool, un: un });

        },

        clearPrefs({ commit }) {
            localStorage
                .removeItem('prefs');
            commit('clear');
        },

    },

    mutations: {
        clear(state) {
            state.prefs = null;
        },
        setTz(state, tz) {
            // str
            state.timezone = tz;
        },
        setTimeFormat(state, format) {
            // 12 || 24
            state.timeFormat = format;
        },
        setTheme(state, theme) {
            // str
            state.theme = theme;
        },
        setSaveUsername(state, { save, un }) {
            // save: bool
            // un: str
            state.saveUn = { save: save, un: un };
        },
    },

    getters: {
        getTz: state => {
            return state.timezone;
        },
        getTFormat: state => {
            return state.timeFormat;
        },
        getTheme: state => {
            return state.theme;
        }
    },
};