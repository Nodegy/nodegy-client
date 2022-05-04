import uniqueId from "lodash/uniqueId";
import About from '@/pages/public-and-user/About.vue';

const iDidentifier = 'publicanduser-';
const meta = { public: true };

const routes = [
    {
        path: '/about',
        name: 'about',
        label: 'About',
        component: About
    },
]

export default routes.map(route => {
    return {
        ...route, id: uniqueId(iDidentifier), meta: meta
    }
});
