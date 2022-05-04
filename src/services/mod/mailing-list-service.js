import { errorHandler, requestHandler } from '../_utils/index';
import store from "@/store/index";
const address = 'mod/mailinglist/';
const service = 'Mod Mailing List';

class ModMailingListService {
    async getMailingList() {
        try {
            const res = await requestHandler(
                service,
                'get',
                address + 'get',
            );

            if (res) {
                await store.dispatch('mailingList/init', res.data.payload);
                return Promise.resolve(res);
            };
        } catch (err) {
            await errorHandler(service, 'get', err);
            return Promise.reject(err);
        };
    };

    async deleteAddresses(addressessIds) {
        try {
            const payload = {
                _ids: addressessIds
            };
            const res = await requestHandler(
                service,
                'patch',
                address + 'delete',
                payload
            );

            if (res) {
                await store.dispatch('mailingList/delete', addressessIds);
                return Promise.resolve(res);
            };
        } catch (err) {
            await errorHandler(service, 'delete', err);
            return Promise.reject(err);
        };
    };
};

export default new ModMailingListService();