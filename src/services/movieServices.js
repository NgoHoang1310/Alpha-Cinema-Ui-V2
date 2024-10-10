import * as request from '~/utils';

const getMovies = async () => {
    const res = await request.get('/movies');
    return res.data;
};

const getMovieDetail = async (id) => {
    const res = await request.get(`/movie-detail/${id}`);
    return res.data;
};

export { getMovies, getMovieDetail };
