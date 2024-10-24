import * as request from '~/utils';

const getUsers = async () => {
    const res = await request.get('/users');
    return res.data;
};

export { getUsers };
