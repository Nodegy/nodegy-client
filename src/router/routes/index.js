import publicAndUserRoutes from '@/router/routes/public-and-user';
import userRoutes from '@/router/routes/user';
import modRoutes from '@/router/routes/mod';
import redirectRoutes from '@/router/routes/redirects';
import landingRoutes from '@/router/routes/landing';

export default publicAndUserRoutes
    .concat(
        userRoutes,
        modRoutes,
        landingRoutes,
        redirectRoutes
    );