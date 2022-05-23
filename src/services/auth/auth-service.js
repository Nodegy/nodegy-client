import axios from '@/axios';
import store from '@/store/index.js';
import Preferences from '@/models/preferences';
import config from "@/config/config";
const API_URL = config.API_URL + 'auth/';
const signupKeyRequired = config.REQUIRE_SIGNUP_KEY;
import { errorHandler } from '@/services/_utils/index';

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
                await store.dispatch('notification/init', notifications);
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
            };

            const res = await axios.post(API_URL + 'signup', payload);
            if (res && !res.isAxiosError) {
                return res;
            }
        } catch (err) {
            errorHandler('Auth-service', 'register', err);
            return err;
        };
    };

    async confirm(email, key, password, timezone, vCode) {
        const payload = {
            email: email,
            timezone: timezone,
            vCode: vCode,
        };

        if (signupKeyRequired) {
            payload.key = key;
        };

        const res = await axios
            .post(API_URL + 'confirm', payload);

        if (res) {
            await this.login({ username: email, password: password });
            await store.dispatch("auth/confirmSuccess");
        }
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