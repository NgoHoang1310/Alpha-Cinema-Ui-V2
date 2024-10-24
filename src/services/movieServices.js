import * as request from '~/utils';

const getMoviesByStatusAndTheater = async (params = {}) => {
    const res = await request.get('/movies', {
        params,
    });
    return res.data;
};

const getMovieDetail = async (id) => {
    const res = await request.get(`/movie-detail/${id}`);
    return res.data;
};

export { getMoviesByStatusAndTheater, getMovieDetail };
