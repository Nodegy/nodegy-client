import axios from '@/axios';
import store from '@/store/index.js';

axios.interceptors.response.use(
    res => {
        return Promise.resolve(res);
    },
    err => {
        // status codes outside the range of 2xx
        if (!err.response || err.message.includes('Network Error')) {
            // catch network error
            err.status = 503;
        } else if (err.response && (err.response.status == 401 || err.response.status == 403)) {
            // catch no token or unauthorized
            store.dispatch('auth/logout');
        };
        return Promise.reject(err);
    });

