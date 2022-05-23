import AuthService from '@/services/auth/auth-service';
import { updateLSObj } from '../_helpers/update-ls-obj';
import { errorHandler } from '@/services/_utils/index';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true, waitingVerification: false }, user: user }
    : { status: { loggedIn: false, waitingVerification: false }, user: null, };

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {

        loginSuccess({ commit }, user) {
            commit('loginSuccess', user);
            localStorage.setItem('user', JSON.stringify(user));
        },

        loginFailure({ commit }) {
            commit('loginFailure');
        },

        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },

        async register({ commit }, { user, signupKey }) {
            try {
                const res = await AuthService.register(user, signupKey);
                if (res) {
                    if (Object.keys(res).includes('isAxiosError') && res.isAxiosError) {
                        errorHandler('Auth-module', 'register', res);
                        return Promise.reject(res);
                    } else {
                        commit('setWaitingVerification', true);
                        commit('onSetUser', { ...user, signupKey: signupKey, roles: [] });
                        return Promise.resolve(res);
                    };
                };

            } catch (err) {
                errorHandler('Auth-module', 'register', err);
                return Promise.reject(err);
            };
        },

        updateUserName({ commit }, updatedUserName) {
            commit('setUserName', updatedUserName);
            updateLSObj('user', 'username', updatedUserName);
        },

        updateEmail({ commit }, updatedEmail) {
            commit('setUserEmail', updatedEmail);
            updateLSObj('user', 'email', updatedEmail);
        },

        setUser({ commit }, user) {
            commit('onSetUser', user)
        },
        cancelWaitingVerification({ commit }) {
            commit('setWaitingVerification', false);
        }

        // updateRoles({ commit }, roles) {
        //     updateLSObj('user', 'roles', roles)
        //     commit('setRoles', roles)
        // }
    },

    mutations: {
        onSetLogin(state, isLoggedIn) {
            state.status.loggedIn = isLoggedIn;
        },
        loginSuccess(state, user) {
            state.user = user;
            state.status.loggedIn = true;
            if (state.status.waitingVerification) {
                state.status.waitingVerification = false;
            }

        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        setUserName(state, username) {
            state.user.username = username;
        },
        setUserEmail(state, email) {
            state.user.email = email;
        },
        setRoles(state, roles) {
            state.user.roles = roles;
        },
        onSetUser(state, user) {
            state.user = user;
        },
        setWaitingVerification(state, isWaiting) {
            state.status.waitingVerification = isWaiting;
        },
    },

    getters: {
        getIsLoggedIn: state => {
            return state.status.loggedIn;
        },
        getIsWaitingVerification: state => {
            return state.status.waitingVerification;
        },
        getUser: state => {
            return state.user;
        },
        getUsername: state => {
            return state.user.username;
        },
    }
};