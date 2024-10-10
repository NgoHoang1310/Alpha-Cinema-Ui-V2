import classNames from 'classnames/bind';
import styles from './Schedule.module.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTags, faClock } from '@fortawesome/free-solid-svg-icons';

import MovieImage from '~/components/Card/MovieImage';
import { ScheduleDate, ScheduleTime } from '~/components/Movie/Schedule';

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
    return (
        <div className="container">
            <ScheduleDate />
            <div className="break-bar"></div>
            <div className={cx('schedule-movie')}>
                <div className="row">
                    {MOVIES.map((movie, index) => {
                        return (
                            <div key={index} className={index !== 0 ? 'col-lg-6 col-md-12' : ''}>
                                <div style={{ marginTop: 24, marginBottom: 24 }} className="row">
                                    <div className={index === 0 ? 'col-lg-3 col-md-4' : 'col-lg-5 col-md-4'}>
                                        <div className={cx('schedule-movie__left')}></div>
                                        <MovieImage
                                            data={{
                                                thumbPath: movie.img,
                                            }}
                                        />
                                    </div>
                                    <div className={index === 0 ? 'col-lg-9 col-md-8' : 'col-lg-7 col-md-8'}>
                                        <div className={cx('schedule-movie__right')}>
                                            <Link>
                                                <h1>{movie.title}</h1>
                                            </Link>
                                            <p>
                                                <span>
                                                    <FontAwesomeIcon className={cx('icon')} icon={faTags} />
                                                    Kinh dị
                                                </span>
                                                <span>
                                                    <FontAwesomeIcon className={cx('icon')} icon={faClock} />
                                                    101 phút
                                                </span>
                                            </p>
                                            <ScheduleTime />
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
