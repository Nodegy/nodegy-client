import AuthService from '@/services/auth/auth-service';
import { updateLSObj } from "../_helpers/update-ls-obj";
import { errorHandler } from "@/services/_utils/index";

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: user.roles.includes('isConfirmed') }, user }
    : { status: { loggedIn: false }, user: null };

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

        async register({ commit }, user) {
            try {
                const res = await AuthService.register(user);
                if (res) {
                    if (Object.keys(res).includes('isAxiosError') && res.isAxiosError) {
                        errorHandler('Auth-module', 'register', res);
                        return Promise.reject(res);
                    } else {
                        commit('loginSuccess', res.user);
                        localStorage.setItem('user', JSON.stringify(res.user));
                        return Promise.resolve(res);
                    };
                };

            } catch (err) {
                errorHandler('Auth-module', 'register', err);
                return Promise.reject(err);
            };
        },

        confirmSuccess({ commit }, roles) {
            updateLSObj('user', 'roles', roles);
            commit('setRoles', roles);
            commit('onSetLogin', true);
        },

        updateUserName({ commit }, updatedUserName) {
            commit('setUserName', updatedUserName);
            updateLSObj('user', 'username', updatedUserName);
        },

        updateEmail({ commit }, updatedEmail) {
            commit('setUserEmail', updatedEmail);
            updateLSObj('user', 'email', updatedEmail);
        },

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
            state.status.loggedIn = state.user.roles.includes('isConfirmed');
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
            state.user.username = username
        },
        setUserEmail(state, email) {
            state.user.email = email
        },
        setRoles(state, roles) {
            state.user.roles = roles
        }
    },

    getters: {
        getIsConfirmed: state => {
            return state.user ? Object.keys(state.user).includes('roles') && state.user.roles.includes('isConfirmed') : false;
        },
        getNeedsConfirmation: state => {
            return state.user ? Object.keys(state.user).includes('roles') && !state.user.roles.includes('isConfirmed') : false;
        },
        getIsLoggedIn: state => {
            return state.status.loggedIn;
        },
        getUser: state => {
            return state.user;
        },
        getUsername: state => {
            return state.user.username;
        },
    }
};