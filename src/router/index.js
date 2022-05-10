import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index.js';
import routes from '@/router/routes/index.js';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: routes,

    scrollBehavior: to => {
        if (to.hash) {
            return { selector: to.hash };
        } else {
            return { x: 0, y: 0 };
        }
    }
});

router.beforeEach((to, from, next) => {
    const loggedIn = store.state.auth.status.loggedIn;
    const isPublic = to.matched.some(record => record.meta.public);
    const onlyLoggedOut = to.matched.some(record => record.meta.onlyLoggedOut);
    const onlyMods = to.matched.some(record => record.meta.modAuth);
    const user = store.state.auth.user;

    if (loggedIn && onlyLoggedOut) {
        return next(`dashboard/${user.username}/profile`);
    }

    if (!isPublic && !loggedIn) {
        return next({
            path: '/login',
            query: { redirect: to.fullPath }
        });
    }

    if (onlyMods) {
        const authRole = ['moderator', 'admin'];
        let auth = false;

        authRole.forEach(role => {
            auth = store.state.auth.user.roles.includes(role) ? true : auth;
        });

        if (!auth) {
            return next({
                path: '/accessdenied',
                query: { redirect: to.fullPath }
            });
        }
    }

    next();
});

export default router;



