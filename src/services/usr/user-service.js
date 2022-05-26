import { errorHandler, requestHandler } from '../_utils/index';
import store from '@/store/index';

const address = 'usr/user/';
const service = 'User';

class UserService {
    async updateUserName(updatedUserName) {
        let payload;
        try {
            payload = {
                username: updatedUserName
            };
            await requestHandler(
                service,
                'update',
                address,
                payload
            );
        } catch (err) {
            await errorHandler(service, 'update', err, payload);
            return Promise.reject();
        };
    };

    async updateUserEmail(updatedEmail) {
        let payload;
        try {
            payload = {
                email: updatedEmail
            };

            await requestHandler(
                service,
                'update',
                address,
                payload
            );

        } catch (err) {
            await errorHandler(service, 'update', err, payload);
            return Promise.reject();
        };
    };

    async updatePassword(password) {
        let payload;
        try {
            payload = {
                password: password
            };

            await requestHandler(
                service,
                'update',
                address,
                payload
            );

        } catch (err) {
            await errorHandler(service, 'update', err, { password: 'removed' });
            return Promise.reject();
        };
    };

    async updatePrefs(key, val) {
        let payload;
        try {
            const prefs = store.state.prefs;
            prefs[key] = val;
            if (prefs.timezone && prefs.timeFormat && prefs.theme) {
                payload = {
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
            await errorHandler(service, 'update', err, payload);
            return Promise.reject();
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
            return Promise.reject();
        };
    };

};

export default new UserService();