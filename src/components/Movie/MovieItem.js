import classNames from 'classnames/bind';
import styles from './Movie.module.scss';

import { memo } from 'react';

import Card from 'react-bootstrap/Card';
import Button from '../Button';
import MovieImage from '../Card/MovieImage';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { openModal } from '~/store/reducers/modalReducer';

const cx = classNames.bind(styles);
function MovieItem({ data = {} }) {
    const dispatch = useDispatch();
    const handleBuyTicket = () => {
        dispatch(
            openModal({
                type: 'schedule',
                data: data,
            }),
        );
    };

    return (
        <Card className={cx('movie-item')}>
            <MovieImage data={data} />
            <Card.Body className={cx('movie-item__infor')} style={{ padding: 0 }}>
                <Link to={`/movie-detail/${data?.id}`}>
                    <h3>{data?.title}</h3>
                </Link>
                <p>
                    Thể loại: <span>{data?.category.join(', ')}</span>
                </p>
                <p>
                    Thời lượng: <span>{data?.duration} phút</span>
                </p>
                {data?.status === 'NS' && (
                    <Button className={cx('buy-button')} primary onClick={handleBuyTicket}>
                        MUA VÉ
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
}

export default memo(MovieItem);
