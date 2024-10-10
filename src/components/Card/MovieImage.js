import classNames from 'classnames/bind';
import styles from './MovieImage.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { memo } from 'react';

import images from '~/assets/Images';
import { openModal } from '~/store/reducers/modalReducer';
const cx = classNames.bind(styles);

function MovieImage({ data = {}, overlay = true }) {
    const dispatch = useDispatch();

    return (
        <div className={cx('movie-item__img')}>
            <Card.Img variant="top" src={data?.thumbPath}></Card.Img>
            <div
                style={{
                    backgroundImage: `url('${images.sickers[data?.limitation]}')`,
                }}
                className={cx('limit-age-badge')}
            ></div>
            {data?.hot && <div className={cx('hot-badge')}></div>}
            {overlay && (
                <div
                    onClick={() => {
                        dispatch(
                            openModal({
                                type: 'trailer',
                                isOpen: true,
                                data: { title: data?.title, link: data?.trailer },
                            }),
                        );
                    }}
                    className={cx('movie-item__overlay')}
                >
                    <FontAwesomeIcon className={cx('icon')} icon={faPlayCircle} />
                </div>
            )}
        </div>
    );
}

export default memo(MovieImage);
