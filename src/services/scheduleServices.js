import * as request from '~/utils';

const getScheduleDays = async (params = {}) => {
    const res = await request.get('/schedules/days', { params });
    return res.data;
};

const getSchedulesByDayAndTheater = async (day, province, theater) => {
    const res = await request.get('/schedules', {
        params: {
            day,
            province,
            theater,
        },
    });
    return res.data;
};

const getScheduleByDayAndMovieAndTheater = async (params = {}) => {
    const res = await request.get('/schedules', {
        params,
    });
    return res.data;
};

export { getScheduleDays, getSchedulesByDayAndTheater, getScheduleByDayAndMovieAndTheater };
