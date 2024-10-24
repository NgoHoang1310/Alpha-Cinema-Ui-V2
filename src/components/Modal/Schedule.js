import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useCallback } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import { ScheduleDate, ScheduleTime } from '~/components/Movie/Schedule';
import Button from '../Button';

import * as apiServices from '~/services';
import { openModal, closeModal } from '~/store/reducers/modalReducer';

function Schedule() {
    const { schedule } = useSelector((state) => state.modal);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { currentTheater } = useSelector((state) => state.theater);
    const [days, setDays] = useState([]);
    const [_schedule, setSchedule] = useState([]);
    const [day, setDay] = useState();
    const dispatch = useDispatch();

    const handleClickOnTime = useCallback((value) => {
        dispatch(
            openModal({
                type: 'booking',
                data: value,
            }),
        );
    }, []);

    useEffect(() => {
        if (!Object.keys(schedule).length > 0) return;
        const fetchApi = async () => {
            const res = await apiServices.getScheduleDays({ movie: schedule?.id });
            setDays(res);
            setDay(res[0]);
        };
        fetchApi();
    }, [schedule]);

    useEffect(() => {
        if (!Object.keys(schedule).length > 0 || !day || !currentTheater?.province || !currentTheater?.theater) return;
        const fetchApi = async () => {
            const res = await apiServices.getScheduleByDayAndMovieAndTheater({
                day,
                movie: schedule?.id,
                theater: currentTheater?.theater,
            });
            setSchedule(res);
        };

        fetchApi();
    }, [day, schedule]);

    return (
        <Modal centered style={{ maxWidth: 900 }} isOpen={Object.keys(schedule).length > 0}>
            <ModalHeader className="d-fles justify-content-end">
                <Button
                    onClick={() => {
                        dispatch(closeModal('schedule'));
                    }}
                >
                    <FontAwesomeIcon icon={faWindowClose} />
                </Button>
            </ModalHeader>
            <ModalBody style={{ padding: 24, minHeight: 350 }}>
                <h1 style={{ textAlign: 'center' }} className="modal-heading">
                    RẠP BETA THÁI NGUYÊN{' '}
                </h1>
                <ScheduleDate days={days} currentDay={day} onDay={setDay} />
                <div style={{ marginBottom: 24 }} className="break-bar"></div>
                <ScheduleTime
                    data={_schedule?.times}
                    onTime={(time) => {
                        handleClickOnTime({
                            movie: _schedule?.movie,
                            time: time,
                            date: _schedule?.date,
                            room: _schedule?.room,
                        });
                    }}
                />
            </ModalBody>
        </Modal>
    );
}

export default Schedule;
