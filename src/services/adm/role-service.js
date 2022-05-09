import axios from 'axios';
const API_URL = process.env.VUE_APP_API_URL + 'adm/role/';

class AdmRoleService {

    updateUserRole(userId, updatedRoles) {
        return axios.patch(API_URL + 'update', {
            userId: userId,
            roles: updatedRoles
        });
    };
};

export default new AdmRoleService();