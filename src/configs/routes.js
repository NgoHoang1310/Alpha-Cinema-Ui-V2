const routes = {
    home: '/',
    schedule: '/schedules',
    movie: '/movies',
    theater: '/theater',
    ticket: '/ticket',
    news: '/news',
    profile: '/profile',
    login: '/login',
    register: '/register',
    movieDetail: '/movie-detail/:movieId',
    seatSelection: '/seat-selection',

    //admin
    admin: {
        dashBoard: '/admin/dash-board',
        user: '/admin/users',
    },
};

export default routes;
