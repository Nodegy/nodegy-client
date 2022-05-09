import axios from 'axios';
import store from '@/store/index';
const API_URL = process.env.VUE_APP_API_URL + 'usr/load/';

class LoadService {
    async stratStore() {
        try {
            const res = await axios
                .get(API_URL + 'stratstore');
            if (res) {
                await store.dispatch('stratStore/init', res.data.payload.stratStore);
                await store.dispatch('notification/init', res.data.payload.notifications);
                return Promise.resolve('success');
            };
        } catch (err) {
            return Promise.reject(err);
        };
    };
};

export default new LoadService();