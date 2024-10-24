import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import MovieList from '~/components/Movie/MovieList';
import * as apiServices from '~/services';

const cx = classNames.bind(styles);

const HOME_NAVS = [
    { type: 'CM', name: 'PHIM SẮP CHIẾU' },
    { type: 'NS', name: 'PHIM ĐANG CHIẾU' },
    { type: 'SP', name: 'SUẤT CHIẾU ĐẶC BIỆT' },
];

function Home() {
    const { currentTheater } = useSelector((state) => state.theater);
    const [navType, setNavType] = useState('NS');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await apiServices.getMoviesByStatusAndTheater({
                status: navType,
                theater: currentTheater?.theater,
            });
            setMovies(response);
        };

        fetchApi();
    }, [navType, currentTheater?.theater]);

    return (
        <div className={cx('wrapper')}>
            <Carousel style={{ width: '100%' }}>
                <Carousel.Item>
                    <img
                        width={'100%'}
                        src="https://files.betacorp.vn/media/images/2024/09/17/cover-cam-173555-170924-48.png"
                    ></img>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        width={'100%'}
                        src="https://files.betacorp.vn/media/images/2024/10/01/resize-mo-dom-dom-01-171611-011024-72.png"
                    ></img>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        width={'100%'}
                        src="https://files.betacorp.vn/media/images/2024/09/27/1702x621-19-161327-270924-72.jpg"
                    ></img>
                </Carousel.Item>
            </Carousel>
            <div className="container">
                <div className={cx('movie-nav')}>
                    {HOME_NAVS.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => setNavType(item.type)}
                                className={cx('movie-nav__item', item.type === navType && 'navbar-active')}
                            >
                                {item.name}
                            </div>
                        );
                    })}
                </div>
                <MovieList data={movies} />
            </div>
            <div style={{ height: 800 }}></div>
        </div>
    );
}

export default Home;
