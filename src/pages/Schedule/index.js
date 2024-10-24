import classNames from 'classnames/bind';
import styles from './Schedule.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faClock } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MovieImage from '~/components/Card/MovieImage';
import { ScheduleDate, ScheduleTime } from '~/components/Movie/Schedule';
import * as apiServices from '~/services';
import { openModal } from '~/store/reducers/modalReducer';

const MOVIES = [
    {
        img: 'https://files.betacorp.vn/media%2fimages%2f2024%2f09%2f10%2fban%2Dsao%2Dcua%2D800wx1200h%2D161119%2D100924%2D16.jpg',
        title: 'Cám',
    },
    {
        img: 'https://files.betacorp.vn/media%2fimages%2f2024%2f09%2f10%2fban%2Dsao%2Dcua%2D800wx1200h%2D161119%2D100924%2D16.jpg',
        title: 'Cám',
    },
    {
        img: 'https://files.betacorp.vn/media%2fimages%2f2024%2f09%2f10%2fban%2Dsao%2Dcua%2D800wx1200h%2D161119%2D100924%2D16.jpg',
        title: 'Cám',
    },
    {
        img: 'https://files.betacorp.vn/media%2fimages%2f2024%2f09%2f10%2fban%2Dsao%2Dcua%2D800wx1200h%2D161119%2D100924%2D16.jpg',
        title: 'Cám',
    },
];
const cx = classNames.bind(styles);
function Schedule() {
    const { currentTheater } = useSelector((state) => state.theater);
    const dispatch = useDispatch();
    const [days, setDays] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [day, setDay] = useState();

    const handleClickOnTime = useCallback((value) => {
        dispatch(
            openModal({
                type: 'booking',
                isOpen: true,
                data: value,
            }),
        );
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await apiServices.getScheduleDays();
            setDays(res);
            setDay(res[0]);
        };
        fetchApi();
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            if (!day || !currentTheater?.province || !currentTheater?.theater) return;
            const res = await apiServices.getSchedulesByDayAndTheater(
                day,
                currentTheater.province,
                currentTheater.theater,
            );
            setSchedules(res);
        };
        fetchApi();
    }, [day, currentTheater?.theater]);

    return (
        <div className="container">
            <ScheduleDate days={days} currentDay={day} onDay={setDay} />
            <div className="break-bar"></div>
            <div className={cx('schedule-movie')}>
                <div className="row">
                    {schedules.map((schedule, index) => {
                        return (
                            <div key={index} className={index !== 0 ? 'col-lg-6 col-md-12' : ''}>
                                <div style={{ marginTop: 24, marginBottom: 24 }} className="row">
                                    <div className={index === 0 ? 'col-lg-3 col-md-4' : 'col-lg-5 col-md-4'}>
                                        <div className={cx('schedule-movie__left')}></div>
                                        <MovieImage data={schedule?.movie} />
                                    </div>
                                    <div className={index === 0 ? 'col-lg-9 col-md-8' : 'col-lg-7 col-md-8'}>
                                        <div className={cx('schedule-movie__right')}>
                                            <Link>
                                                <h1>{schedule?.movie?.title}</h1>
                                            </Link>
                                            <p>
                                                <span>
                                                    <FontAwesomeIcon className={cx('icon')} icon={faTags} />
                                                    {schedule?.movie?.category.join(', ')}
                                                </span>
                                                <span>
                                                    <FontAwesomeIcon className={cx('icon')} icon={faClock} />
                                                    {schedule?.movie?.duration} phút
                                                </span>
                                            </p>
                                            <ScheduleTime
                                                data={schedule?.times}
                                                onTime={(time) => {
                                                    handleClickOnTime({
                                                        movie: schedule?.movie,
                                                        time: time,
                                                        date: schedule?.date,
                                                        room: schedule?.room,
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="break-bar"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="break-bar"></div>
        </div>
    );
}

export default Schedule;
