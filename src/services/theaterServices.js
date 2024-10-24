import * as request from '~/utils';

const getTheaters = async () => {
    const res = await request.get('/theaters');
    return res.data;
};

export { getTheaters };
