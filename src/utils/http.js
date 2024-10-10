import axios from 'axios';

let isRefreshing = false;
let failedQueue = [];

const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

const getToken = () => {
    let token = localStorage.getItem('token');
    return JSON.parse(token);
};

export const get = async (url, options = {}) => {
    const res = await request.get(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return res.data;
};

export const post = async (url, options = {}, configs = { contentType: 'application/json' }) => {
    const res = await request.post(url, options, {
        headers: {
            'Content-Type': `${configs?.contentType}`,
        },
    });
    return res.data;
};

export const patch = async (url, options = {}, configs = { contentType: 'application/json' }) => {
    const res = await request.patch(url, options, {
        headers: {
            'Content-Type': `${configs?.contentType}`,
        },
    });
    return res.data;
};

export const destroy = async (url, options = {}, configs = { contentType: 'application/json' }) => {
    const res = await request.delete(url, {
        ...options,
        headers: {
            'Content-Type': `${configs?.contentType}`,
        },
    });
    return res.data;
};
//* process refreshtoken queue when multiple request failed !
const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });

    failedQueue = [];
};

//*
const refreshToken = async () => {
    try {
        const res = await request.post('/auth/refresh-token');
        localStorage.setItem('token', JSON.stringify(res.data.data));
        processQueue(null);
        return res.data.data;
    } catch (error) {
        processQueue(error);
        throw error;
    }
};
//* handle call refresh token api !
const getNewToken = async () => {
    if (!isRefreshing) {
        isRefreshing = true;
        let newToken = await refreshToken();
        isRefreshing = false;
        return newToken;
    }
    return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
    });
};

request.interceptors.request.use(
    function (config) {
        //* Any status code that lie within the range of 2xx cause this function to trigger
        //Todo: Do something with config data
        const token = !isRefreshing ? getToken()?.accessToken : getToken()?.refreshToken;
        if (!token) return config;
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    function (error) {
        //* Any status codes that falls outside the range of 2xx cause this function to trigger
        //Todo: Do something with response error
        return Promise.reject(error);
    },
);

request.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        const config = error?.config;
        if (error?.response?.status === 401 && !config?._retry) {
            config._retry = true;
            if (isRefreshing) return Promise.reject(error);
            let newToken = await getNewToken();
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${newToken?.accessToken}`,
            };
            return request(config);
        }

        //Todo: Do something with response error
        return Promise.reject(error);
    },
);

export default request;
