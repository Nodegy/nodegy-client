import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from './modules/auth-module';
import { notification } from './modules/notification/notification-module';
import { initApp } from './modules/init-app-module';
import { prefs } from './modules/pref-module';
import { requestLimiter } from './modules/request-limiter-module';
import { selected } from './modules/selected-module';
import { stratStore } from './modules/strat-store-module';

//admin
import { signupKeys } from './modules/admin/signup-keys/signup-key-module';

//mod
import { mailingList } from './modules/mod/mailing-list-module';

Vue.use(Vuex);

export default new Vuex.Store({
    // strict: true,
    modules: {
        auth,
        notification,
        initApp,
        prefs,
        requestLimiter,
        selected,
        stratStore,
        signupKeys,
        mailingList
    }
});