const root = '/dashboard/:user'
const meta = { public: false };

const routes = [
    {
        path: '/profile',
        name: 'profile',
        title: 'Profile',
        icon: 'pe-7s-id',
        component: () => import('@/pages/dashboard/user/profile/Profile.vue'),
    },
    {
        path: '/strategy',
        name: 'strategy',
        title: 'Strategy',
        icon: 'pe-7s-graph3',
        component: () => import('@/pages/dashboard/user/strategy/Strategy.vue')
    },
    {
        path: '/papertrading',
        name: 'papertrading',
        title: 'Paper trading',
        icon: 'pe-7s-graph1',
        component: () => import('@/pages/dashboard/user/PaperTrading.vue')
    },
    {
        path: '/feedback',
        name: 'feedback',
        title: 'Feedback',
        icon: 'pe-7s-note',
        component: () => import('@/pages/dashboard/user/Feedback.vue')
    },
];

export default routes.map(route => {
    return {
        ...route, path: `${root}${route.path}`, meta: meta
    }
});
