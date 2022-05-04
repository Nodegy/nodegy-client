import LoadService from "@/services/usr/load-service";
import store from '@/store/index';
import { errorHandler } from "@/services/_utils/index";

class InitService {
    async init(loggedIn) {
        try {
            if (loggedIn) {
                await LoadService.stratStore();
            }
            await store.dispatch('initApp/initApp', true);
            return true

        } catch (err) {
            errorHandler('InitService', 'init', err);
            return false;
        };

    };
};

export default new InitService();