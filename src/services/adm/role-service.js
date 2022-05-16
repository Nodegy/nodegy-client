import axios from '@/axios';
import config from "@/config/config";
const API_URL = config.API_URL + 'adm/role/';

class AdmRoleService {

    updateUserRole(userId, updatedRoles) {
        return axios.patch(API_URL + 'update', {
            userId: userId,
            roles: updatedRoles
        });
    };
};

export default new AdmRoleService();