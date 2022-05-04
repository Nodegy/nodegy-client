import Vue from 'vue';
import App from './App.vue';
import router from '@/router/index';
import store from './store';
import allPlugins from './plugins/now-ui-kit-custom';
import { ValidationProvider } from 'vee-validate';
import { ValidationObserver } from 'vee-validate';
import './validators';

import Default from './layout-dashboard/Wrappers/baseLayout.vue';
import NoNav from './layout-dashboard/Wrappers/noNavLayout.vue';

Vue.config.productionTip = false;

Vue.use(allPlugins);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.component('default-layout', Default);
Vue.component('nonav-layout', NoNav);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
