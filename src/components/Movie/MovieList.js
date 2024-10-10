import classNames from 'classnames/bind';
import styles from './Movie.module.scss';

import MovieItem from './MovieItem';
import { useEffect, useState } from 'react';

import * as apiServices from '~/services';
const cx = classNames.bind(styles);
function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            const response = await apiServices.getMovies();
            setMovies(response);
        };

        fetchApi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('movie-list')} style={{ height: 500 }}>
                <div className="row">
                    {movies?.map((movie) => {
                        return (
                            <div key={movie.id} className="col-lg-3 col-md-4 col-sm-6">
                                <MovieItem data={movie} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default MovieList;
