import * as request from '~/utils';

const register = async (payload) => {
    try {
        const res = await request.post('/auth/register', payload);
        return res;
    } catch (error) {
        return error?.response?.data;
    }
};

const login = async (payload) => {
    try {
        const res = await request.post('/auth/login', payload);
        return res;
    } catch (error) {
        return error?.response?.data;
    }
};

const getMe = async () => {
    const res = await request.get('/auth/me');
    return res.data;
};

const logOut = async (userId) => {
    const res = await request.destroy(`/auth/users/${userId}/log-out`);
    return res;
};

export { register, login, logOut, getMe };
