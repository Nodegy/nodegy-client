import { errorHandler, requestHandler } from '../_utils/index';
import store from '@/store/index';

const address = 'usr/user/';
const service = 'User';

class UserService {
    async updateUserName(updatedUserName) {
        try {
            const payload = {
                username: updatedUserName
            };

            await requestHandler(
                service,
                'update',
                address,
                payload
            );

        } catch (err) {
            await errorHandler(service, 'update', err);
            return Promise.reject(err);
        };
    };

    async updateUserEmail(updatedEmail) {
        try {
            const payload = {
                email: updatedEmail
            };

            await requestHandler(
                service,
                'update',
                address,
                payload
            );

        } catch (err) {
            await errorHandler(service, 'update', err);
            return Promise.reject(err);
        };
    };

    async updatePassword(password) {
        try {
            const payload = {
                password: password
            };

            await requestHandler(
                service,
                'update',
                address,
                payload
            );

        } catch (err) {
            await errorHandler(service, 'update', err);
            return Promise.reject(err);
        };
    };

    async updatePrefs(key, val) {
        try {
            const prefs = store.state.prefs;
            prefs[key] = val;

            if (prefs.timezone && prefs.timeFormat && prefs.theme) {
                const payload = {
                    preferences: {
                        timezone: prefs.timezone,
                        timeFormat: prefs.timeFormat,
                        theme: prefs.theme
                    }
                };

                const res = await requestHandler(
                    service,
                    'update',
                    address,
                    payload
                );

                if (res) {
                    await store.dispatch('prefs/updatePref', {
                        key: key,
                        val: val
                    });
                };
            };
        } catch (err) {
            await errorHandler(service, 'update', err);
            return Promise.reject(err);
        };
    };

    async deleteAccount() {
        try {
            const res = await requestHandler(
                service,
                'delete',
                address
            );

            if (res) {
                await store.dispatch('prefs/clearPrefs');
                await store.dispatch('auth/logout');
                return Promise.resolve(true);
            };
        } catch (err) {
            await errorHandler(service, 'delete', err);
            return Promise.reject(err);
        };
    };

};

export default new UserService();