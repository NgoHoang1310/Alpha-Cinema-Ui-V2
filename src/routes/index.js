import config from '~/configs';
import Home from '~/pages/Home';
import { FullsizeLayout, HeaderOnly, AdminLayout } from '~/layouts';
import { Login, Register } from '~/pages/Auth';
import MovieDetail from '~/pages/MovieDetail';
import Schedule from '~/pages/Schedule';
import SeatSelection from '~/pages/SeatSelection';

import DashBoard from '~/pages/Admin/DashBoard';
import User from '~/pages/Admin/User';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.movie, component: Home },
    { path: config.routes.login, component: Login, layout: FullsizeLayout },
    { path: config.routes.register, component: Register, layout: FullsizeLayout },
    { path: config.routes.movieDetail, component: MovieDetail },
    { path: config.routes.schedule, component: Schedule },
    { path: config.routes.seatSelection, component: SeatSelection },

    { path: config.routes.admin.dashBoard, component: DashBoard, layout: AdminLayout },
    { path: config.routes.admin.user, component: User, layout: AdminLayout },
    // { path: config.routes.post, component: Post, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
