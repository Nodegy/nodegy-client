import uniqueId from "lodash/uniqueId";
import { EmailUs, Landing } from "@/pages/landing/index";
import { Login } from "@/pages/auth/index";
import MainNavbar from '@/layout-landing/MainNavbar.vue';

const iDidentifier = 'publicanduser-';
const meta = { public: true, onlyLoggedOut: true };

const routes = [
    {
        path: '/emailus',
        name: 'emailus',
        components: { default: EmailUs, header: MainNavbar },
        props: {
            header: { colorOnScroll: 400 },
        }
    },
    {
        path: '/landing',
        name: 'landing',
        label: 'Landing',
        components: { default: Landing, header: MainNavbar },
        props: {
            header: { colorOnScroll: 400 }
        }
    },
    {
        path: '/login',
        name: 'login',
        components: { default: Login, header: MainNavbar },
        props: {
            header: { colorOnScroll: 400 },
        }
    }

]

export default routes.map(route => {
    return {
        ...route, id: uniqueId(iDidentifier), meta: meta
    }
});
