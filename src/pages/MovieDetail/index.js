import classNames from 'classnames/bind';
import styles from './MovieDetail.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';

import MovieImage from '~/components/Card/MovieImage';
import Trailer from '~/components/Trailer';
import { useEffect, useState } from 'react';
import * as apiServices from '~/services';
const cx = classNames.bind(styles);

function MovieDetail() {
    let { movieId } = useParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        const fetchApi = async () => {
            const response = await apiServices.getMovieDetail(movieId);
            setMovie(response);
        };

        fetchApi();
    }, [movieId]);

    return (
        <div className={cx('wrapper')}>
            <div className="container">
                <div className={cx('movie-detail')}>
                    <h1>
                        <Link to={'/'}>Trang chủ</Link> <FontAwesomeIcon icon={faCaretRight} />{' '}
                        <span>{movie?.title}</span>
                    </h1>
                    <div className="row">
                        <div className="col-lg-3 col-md-4">
                            <div className={cx('movie-detail__left')}>
                                <MovieImage data={movie} overlay={false} />
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-8">
                            <div className={cx('movie-detail__right')}>
                                <h2>{movie?.title}</h2>
                                <p>{movie?.description}</p>
                                <div className={cx('movie-detail__right--infor')}>
                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-4">
                                            <span>Đạo diễn:</span>
                                        </div>
                                        <div className="col-lg-9 col-md-8 col-sm-8 col-8">{movie?.director}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-4">
                                            <span>Diễn viên:</span>
                                        </div>
                                        <div className="col-lg-9 col-md-8 col-sm-8 col-8">{movie?.cast}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-4">
                                            <span>Thể loại:</span>
                                        </div>
                                        <div className="col-lg-9 col-md-8 col-sm-8 col-8">
                                            {movie?.category?.join(', ')}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-4">
                                            <span>Thời lượng:</span>
                                        </div>
                                        <div className="col-lg-9 col-md-8 col-sm-8 col-8">{movie?.duration} phút</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-4">
                                            <span>Ngôn ngữ:</span>
                                        </div>
                                        <div className="col-lg-9 col-md-8 col-sm-8 col-8">{movie?.language}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-3 col-md-4 col-sm-4 col-4">
                                            <span>Ngày khởi chiếu:</span>
                                        </div>
                                        <div className="col-lg-9 col-md-8 col-sm-8 col-8">{movie?.releaseDate}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('trailer')}>
                <h1>TRAILER</h1>
                <Trailer link={movie?.trailer} />
            </div>
        </div>
    );
}

export default MovieDetail;
