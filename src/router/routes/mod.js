const root = '/dashboard/mod/:user';
const meta = { public: false, modAuth: true };

const routes = [
    {
        path: '/moddashboard',
        name: 'moddashboard',
        title: 'Mod Dashboard',
        icon: 'pe-7s-note',
        component: () => import('@/pages/dashboard/mod/ModDashboard.vue')
    },
];

export default routes.map(route => {
    return {
        ...route, path: `${root}${route.path}`, meta: meta
    };
});
