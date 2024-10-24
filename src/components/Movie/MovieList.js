import classNames from 'classnames/bind';
import styles from './Movie.module.scss';

import MovieItem from './MovieItem';

const cx = classNames.bind(styles);
function MovieList({ data = [] }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('movie-list')} style={{ height: 500 }}>
                <div className="row">
                    {data?.map((movie) => {
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
