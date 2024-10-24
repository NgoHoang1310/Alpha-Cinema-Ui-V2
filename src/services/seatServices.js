import * as request from '~/utils';

const getSeatsByRoom = async (id) => {
    const res = await request.get(`/seats/room/${id}`);
    return res.data;
};

export { getSeatsByRoom };
