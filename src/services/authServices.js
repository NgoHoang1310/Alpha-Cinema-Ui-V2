import * as request from '~/utils';

const handleRegister = async (payload) => {
    try {
        const res = await request.post('/auth/register', payload);
        return res;
    } catch (error) {
        return error?.response?.data;
    }
};

const handleLogin = async (payload) => {
    try {
        const res = await request.post('/auth/login', payload);
        return res;
    } catch (error) {
        return error?.response?.data;
    }
};

export { handleRegister, handleLogin };
