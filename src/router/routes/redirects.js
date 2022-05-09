const meta = {
    public: true,
};

const routes = [
    {
        path: '*',
        name: 'NotFound404',
        component: () => import('@/pages/redirects/NotFound404.vue')
    },
    {
        path: '/accessdenied',
        name: 'AccessDenied',
        component: () => import('@/pages/redirects/AccessDenied.vue')
    },

];

export default routes.map(route => {
    return {
        ...route, meta: meta
    };
});