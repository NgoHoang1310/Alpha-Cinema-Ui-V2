import config from '~/configs';
import Home from '~/pages/Home';
import { FullsizeLayout, HeaderOnly } from '~/layouts';
import { Login, Register } from '~/pages/Auth';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.movie, component: Home },
    { path: config.routes.login, component: Login, layout: FullsizeLayout },
    { path: config.routes.register, component: Register, layout: FullsizeLayout },
    // { path: config.routes.profile, component: Profile },
    // { path: config.routes.post, component: Post, layout: null },
];

const privateRoutes = [
    // { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    // { path: config.routes.following, component: Following },
];

export { publicRoutes, privateRoutes };
