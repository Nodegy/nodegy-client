import axios from 'axios';
import store from "@/store/index.js";
import Preferences from "@/models/preferences";
const API_URL = process.env.VUE_APP_API_URL + 'auth/';
import { errorHandler } from "@/services/_utils/index";

class AuthService {
    async login(user) {
        try {
            const res = await axios
                .post(API_URL + 'signin', {
                    usernameOrEmail: user.username,
                    password: user.password
                });
            if (res) {
                const data = { ...res.data.payload };
                const userStore = data.user;
                const stratStore = data.stratStore;
                const prefs = data.preferences;
                const notifications = data.notifications;
                const prefStore = new Preferences(prefs.timezone, prefs.timeFormat, prefs.theme);

                await store.dispatch('prefs/init', prefStore);
                await store.dispatch('stratStore/init', stratStore);
                await store.dispatch('notification/init', notifications)
                await store.dispatch('initApp/initApp', true);
                await store.dispatch('auth/loginSuccess', userStore);

                return 'successful';
            };

        } catch (err) {
            store.dispatch('auth/loginFailure');
            errorHandler('Auth-service', 'login', err);
            return Promise.reject(err);
        };
    };

    logout() {
        localStorage
            .removeItem('user');
    };

    async register(user) {
        try {
            const payload = {
                username: user.username,
                email: user.email,
                password: user.password,
                timezone: user.timezone,
            };

            if (user.key) {
                payload.key = user.key;
            }

            const res = await axios.post(API_URL + 'signup', payload);
            if (res) {
                return res.data.payload;
            }
        } catch (err) {
            errorHandler('Auth-service', 'register', err);
            return err;
        };
    };

    confirm(roles, vCode) {
        return axios
            .patch(API_URL + 'verification/confirmemail', {
                roles: roles,
                vCode: vCode,
            }, { withCredentials: true });
    };

    resetPw(email, vCode, password) {
        return axios
            .patch(API_URL + 'verification/resetpw', {
                email: email,
                vCode: vCode,
                password: password
            });
    };
};

export default new AuthService();