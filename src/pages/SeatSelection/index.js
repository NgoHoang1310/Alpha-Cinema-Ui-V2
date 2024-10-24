import classNames from 'classnames/bind';
import styles from './SeatSelection.module.scss';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCaretRight,
    faTags,
    faClock,
    faMasksTheater,
    faCalendarDays,
    faTv,
    faCouch,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import images from '~/assets/Images';
import { SeatArea } from '~/components/Seat';
import Button from '~/components/Button';
import { useEffect, useRef, useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentSeats } from '~/store/reducers/bookingReducer';
import { formatCurrency } from '~/utils/common';
import { useCountdown, useCookie } from '~/hooks';
import config from '~/configs';

import * as apiServices from '~/services';

const SEATS = [
    { row: 'A', number: 1, type: { type: 'NORMAL' }, status: 'EMPTY', price: '55000' },
    { row: 'A', number: 2, type: { type: 'NORMAL' }, status: 'EMPTY', price: '55000' },
    { row: 'A', number: 3, type: { type: 'NORMAL' }, status: 'RESERVED', price: '55000' },
    { row: 'A', number: 4, type: { type: 'NORMAL' }, status: 'RESERVED', price: '55000' },
    { row: 'A', number: 5, type: { type: 'NORMAL' }, status: 'RESERVED', price: '55000' },
    { row: 'A', number: 6, type: { type: 'NORMAL' }, status: 'EMPTY', price: '55000' },
    { row: 'A', number: 7, type: { type: 'NORMAL' }, status: 'EMPTY', price: '55000' },

    { row: 'B', number: 1, type: { type: 'VIP' }, status: 'EMPTY', price: '60000' },
    { row: 'B', number: 2, type: { type: 'VIP' }, status: 'EMPTY', price: '60000' },
    { row: 'B', number: 3, type: { type: 'VIP' }, status: 'EMPTY', price: '60000' },
    { row: 'B', number: 4, type: { type: 'VIP' }, status: 'EMPTY', price: '60000' },
    { row: 'B', number: 5, type: { type: 'VIP' }, status: 'EMPTY', price: '60000' },
    { row: 'B', number: 6, type: { type: 'VIP' }, status: 'EMPTY', price: '60000' },
    { row: 'B', number: 7, type: { type: 'VIP' }, status: 'EMPTY', price: '60000' },

    { row: 'C', number: 1, type: { type: 'DOUBLE' }, status: 'EMPTY', price: '65000' },
    { row: 'C', number: 2, type: { type: 'DOUBLE' }, status: 'EMPTY', price: '65000' },
    { row: 'C', number: 3, type: { type: 'DOUBLE' }, status: 'EMPTY', price: '65000' },
    { row: 'C', number: 4, type: { type: 'DOUBLE' }, status: 'RESERVED', price: '65000' },
    { row: 'C', number: 5, type: { type: 'DOUBLE' }, status: 'EMPTY', price: '65000' },
    { row: 'C', number: 6, type: { type: 'DOUBLE' }, status: 'EMPTY', price: '65000' },
    { row: 'C', number: 7, type: { type: 'DOUBLE' }, status: 'RESERVED', price: '65000' },
    { row: 'C', number: 8, type: { type: 'DOUBLE' }, status: 'RESERVED', price: '65000' },
    { row: 'C', number: 9, type: { type: 'DOUBLE' }, status: 'RESERVED', price: '65000' },
];

const ROWS = ['A', 'B', 'C', 'D', 'E', 'H'];
const MAX_TIME = 10;

const cx = classNames.bind(styles);
function SeatSelection() {
    const { currentSeats } = useSelector((state) => state.booking);
    const { cookie, updateCookie } = useCookie('currentSchedule');
    const [seatsProfile, setSeatsProfile] = useState({});
    const [totalMoney, setTotalMoney] = useState(0);
    const [seats, setSeats] = useState([]);
    const dispatch = useDispatch();

    const { minutes, seconds } = useCountdown(MAX_TIME, () => {
        dispatch(setCurrentSeats([]));
        updateCookie({});
        window.location.href = config.routes.home;
    });

    useEffect(() => {
        if (!cookie) return (window.location.href = config.routes.home);
        const fetchApi = async () => {
            const res = await apiServices.getSeatsByRoom(cookie?.room?.id);
            setSeats(res);
        };
        fetchApi();
    }, []);

    useEffect(() => {
        if (currentSeats.length === 0) {
            setSeatsProfile({});
            setTotalMoney(0);
            return;
        }

        const seatProfileUpdate = currentSeats.reduce((acc, currentSeat) => {
            if (!acc[currentSeat.type]) {
                acc[currentSeat.type] = {
                    quantity: 0,
                    price: currentSeat.price,
                };
            }
            acc[currentSeat.type].quantity += 1;

            return acc;
        }, {});

        const total = currentSeats.reduce((acc, currentSeat) => {
            if (!acc) acc = 0;
            acc += +currentSeat.price;
            return acc;
        }, 0);

        setSeatsProfile(seatProfileUpdate);
        setTotalMoney(total);
    }, [currentSeats]);

    return (
        <div className="container">
            <div className="row">
                <div className={cx('col-lg-8')}>
                    <div className={cx('seat-selection')}>
                        <h1>
                            <Link to={'/'}>Trang chủ</Link> <FontAwesomeIcon icon={faCaretRight} /> Đặt vé{' '}
                            <FontAwesomeIcon icon={faCaretRight} /> <span>{cookie?.movie?.title}</span>
                        </h1>
                        <div className="row mt-5">
                            <div className="col-lg-3">
                                <div className={cx('seat-type')}>
                                    <img width={'20%'} src={images.seats.NORMAL.EMPTY}></img>
                                    <p>Ghế trống</p>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className={cx('seat-type')}>
                                    <img width={'20%'} src={images.seats.NORMAL.selected}></img>
                                    <p>Ghế đang chọn</p>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className={cx('seat-type')}>
                                    <img width={'20%'} src={images.seats.NORMAL.EMPTY}></img>
                                    <p>Ghế đang giữ</p>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className={cx('seat-type')}>
                                    <img width={'20%'} src={images.seats.NORMAL.RESERVED}></img>
                                    <p>Ghế đã đặt</p>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className={cx('screen-image')}></div>
                        </div>
                        <div className={cx('seat-selection__area')}>
                            <SeatArea rows={ROWS} seats={seats} />
                        </div>
                        <div className={cx('seat-selection__guidence')}>
                            <div className="row">
                                <div className="col-lg-2">
                                    <div className={cx('seat-selection__guidence--item')}>
                                        <div className="row">
                                            <img src={images.seats.NORMAL.EMPTY} className="col-lg-6"></img>
                                            <p className="col-lg-6 ">Ghế Thường</p>
                                        </div>
                                    </div>
                                    <p className="text-end mt-3">
                                        {seatsProfile?.NORMAL?.quantity > 0 &&
                                            seatsProfile?.NORMAL?.quantity +
                                                ' x ' +
                                                formatCurrency(seatsProfile?.NORMAL?.price, 'vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                    </p>
                                </div>
                                <div className="col-lg-2">
                                    <div className={cx('seat-selection__guidence--item')}>
                                        <div className="row">
                                            <img src={images.seats.VIP.EMPTY} className="col-lg-6"></img>
                                            <p className="col-lg-3">Ghế Vip</p>
                                        </div>
                                    </div>
                                    <p className="text-end mt-3">
                                        {seatsProfile?.VIP?.quantity > 0 &&
                                            seatsProfile?.VIP?.quantity +
                                                ' x ' +
                                                formatCurrency(seatsProfile?.VIP?.price, 'vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                    </p>
                                </div>
                                <div className="col-lg-2">
                                    <div className={cx('seat-selection__guidence--item')}>
                                        <div className="row">
                                            <img src={images.seats.DOUBLE.EMPTY} className="col-lg-6"></img>
                                            <p className="col-lg-3">Ghế Đôi</p>
                                        </div>
                                    </div>
                                    <p className="text-end mt-3">
                                        {seatsProfile?.DOUBLE?.quantity > 0 &&
                                            seatsProfile?.DOUBLE?.quantity +
                                                ' x ' +
                                                formatCurrency(seatsProfile?.DOUBLE?.price, 'vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                    </p>
                                </div>
                                <div className="col-lg-2">
                                    <div className={cx('seat-selection__guidence--item')}>Tổng tiền</div>
                                    <p className="text-active text-end mt-3">
                                        {formatCurrency(totalMoney, 'vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </p>
                                </div>
                                <div className="col-lg-2">
                                    <div className={cx('seat-selection__guidence--item')}>
                                        Thời gian còn lại
                                        <span className="text-end">{`${minutes}:${seconds}`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('col-lg-4')}>
                    <div className={cx('movie-information')}>
                        <div className="row">
                            <div className="col-lg-5">
                                <img width={'100%'} src={cookie?.movie?.thumbPath}></img>
                            </div>
                            <div className="col-lg-7 ">
                                <h2 className="title-active mt-5 fs-1">{cookie?.movie?.title}</h2>
                                <p style={{ fontFamily: 'Oswald' }} className="mt-3 fs-3 fw-bold ">
                                    {cookie?.room?.type['type']}
                                </p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className={cx('movie-information__item')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faTags} />
                                    <span>Thể loại</span>
                                </div>
                            </div>
                            <div className="col-lg-6 ">
                                <div className={cx('movie-information__item')}>
                                    <p>{cookie?.movie?.category?.join(', ')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className={cx('movie-information__item')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faClock} />
                                    <span>Thời lượng</span>
                                </div>
                            </div>
                            <div className="col-lg-6 ">
                                <div className={cx('movie-information__item')}>
                                    <p>{cookie?.movie?.duration} phút</p>
                                </div>
                            </div>
                        </div>
                        <hr className="break-bar dashed"></hr>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className={cx('movie-information__item')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faMasksTheater} />
                                    <span>Rạp chiếu</span>
                                </div>
                            </div>
                            <div className="col-lg-6 ">
                                <div className={cx('movie-information__item')}>
                                    <p>{cookie?.room?.theater?.district}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className={cx('movie-information__item')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faCalendarDays} />
                                    <span>Ngày chiếu</span>
                                </div>
                            </div>
                            <div className="col-lg-6 ">
                                <div className={cx('movie-information__item')}>
                                    <p>{cookie?.date}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className={cx('movie-information__item')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faClock} />
                                    <span>Giờ chiếu</span>
                                </div>
                            </div>
                            <div className="col-lg-6 ">
                                <div className={cx('movie-information__item')}>
                                    <p>{cookie?.time}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className={cx('movie-information__item')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faTv} />
                                    <span>Phòng chiếu</span>
                                </div>
                            </div>
                            <div className="col-lg-6 ">
                                <div className={cx('movie-information__item')}>
                                    <p>{cookie?.room?.name}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className={cx('movie-information__item')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faCouch} />
                                    <span>Ghế ngồi</span>
                                </div>
                            </div>
                            <div className="col-lg-6 ">
                                <div className={cx('movie-information__item')}>
                                    <p>
                                        {currentSeats.map((currentSeat, index) => {
                                            return currentSeat.seat + ', ';
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center mt-3 pb-5">
                            <Button primary>Tiếp tục</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(SeatSelection);
