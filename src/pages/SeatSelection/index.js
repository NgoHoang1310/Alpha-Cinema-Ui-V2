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
import { useCountdown, useSessionStorage } from '~/hooks';
import config from '~/configs';

const SEATS = [
    { row: 'A', number: 1, type: 'normal', status: 'unselected', price: '55000' },
    { row: 'A', number: 2, type: 'normal', status: 'unselected', price: '55000' },
    { row: 'A', number: 3, type: 'normal', status: 'reserved', price: '55000' },
    { row: 'A', number: 4, type: 'normal', status: 'reserved', price: '55000' },
    { row: 'A', number: 5, type: 'normal', status: 'reserved', price: '55000' },
    { row: 'A', number: 6, type: 'normal', status: 'unselected', price: '55000' },
    { row: 'A', number: 7, type: 'normal', status: 'unselected', price: '55000' },

    { row: 'B', number: 1, type: 'vip', status: 'unselected', price: '60000' },
    { row: 'B', number: 2, type: 'vip', status: 'unselected', price: '60000' },
    { row: 'B', number: 3, type: 'vip', status: 'unselected', price: '60000' },
    { row: 'B', number: 4, type: 'vip', status: 'unselected', price: '60000' },
    { row: 'B', number: 5, type: 'vip', status: 'unselected', price: '60000' },
    { row: 'B', number: 6, type: 'vip', status: 'unselected', price: '60000' },
    { row: 'B', number: 7, type: 'vip', status: 'unselected', price: '60000' },

    { row: 'C', number: 1, type: 'double', status: 'unselected', price: '65000' },
    { row: 'C', number: 2, type: 'double', status: 'unselected', price: '65000' },
    { row: 'C', number: 3, type: 'double', status: 'unselected', price: '65000' },
    { row: 'C', number: 4, type: 'double', status: 'reserved', price: '65000' },
    { row: 'C', number: 5, type: 'double', status: 'unselected', price: '65000' },
    { row: 'C', number: 6, type: 'double', status: 'unselected', price: '65000' },
    { row: 'C', number: 7, type: 'double', status: 'reserved', price: '65000' },
    { row: 'C', number: 8, type: 'double', status: 'reserved', price: '65000' },
    { row: 'C', number: 9, type: 'double', status: 'reserved', price: '65000' },
];

const ROWS = ['A', 'B', 'C', 'D', 'E', 'H'];
const MAX_TIME = 1;

const cx = classNames.bind(styles);
function SeatSelection() {
    const { currentSeats } = useSelector((state) => state.booking);
    const dispatch = useDispatch();
    const { minutes, seconds } = useCountdown(MAX_TIME, () => {
        dispatch(setCurrentSeats([]));
        window.location.href = config.routes.home;
    });
    const [seatsProfile, setSeatsProfile] = useState({});
    const [totalMoney, setTotalMoney] = useState(0);

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
                            <FontAwesomeIcon icon={faCaretRight} /> <span>Tên phim</span>
                        </h1>
                        <div className="row mt-5">
                            <div className="col-lg-3">
                                <div className={cx('seat-type')}>
                                    <img width={'20%'} src={images.seats.normal.unselected}></img>
                                    <p>Ghế trống</p>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className={cx('seat-type')}>
                                    <img width={'20%'} src={images.seats.normal.selected}></img>
                                    <p>Ghế đang chọn</p>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className={cx('seat-type')}>
                                    <img width={'20%'} src={images.seats.normal.unselected}></img>
                                    <p>Ghế đang giữ</p>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className={cx('seat-type')}>
                                    <img width={'20%'} src={images.seats.normal.reserved}></img>
                                    <p>Ghế đã đặt</p>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className={cx('screen-image')}></div>
                        </div>
                        <div className={cx('seat-selection__area')}>
                            <SeatArea rows={ROWS} seats={SEATS} />
                        </div>
                        <div className={cx('seat-selection__guidence')}>
                            <div className="row">
                                <div className="col-lg-2">
                                    <div className={cx('seat-selection__guidence--item')}>
                                        <div className="row">
                                            <img src={images.seats.normal.unselected} className="col-lg-6"></img>
                                            <p className="col-lg-6 ">Ghế Thường</p>
                                        </div>
                                    </div>
                                    <p className="text-end mt-3">
                                        {seatsProfile?.normal?.quantity > 0 &&
                                            seatsProfile?.normal?.quantity +
                                                ' x ' +
                                                formatCurrency(seatsProfile?.normal?.price, 'vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                    </p>
                                </div>
                                <div className="col-lg-2">
                                    <div className={cx('seat-selection__guidence--item')}>
                                        <div className="row">
                                            <img src={images.seats.vip.unselected} className="col-lg-6"></img>
                                            <p className="col-lg-3">Ghế Vip</p>
                                        </div>
                                    </div>
                                    <p className="text-end mt-3">
                                        {seatsProfile?.vip?.quantity > 0 &&
                                            seatsProfile?.vip?.quantity +
                                                ' x ' +
                                                formatCurrency(seatsProfile?.vip?.price, 'vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                    </p>
                                </div>
                                <div className="col-lg-2">
                                    <div className={cx('seat-selection__guidence--item')}>
                                        <div className="row">
                                            <img src={images.seats.double.unselected} className="col-lg-6"></img>
                                            <p className="col-lg-3">Ghế Đôi</p>
                                        </div>
                                    </div>
                                    <p className="text-end mt-3">
                                        {seatsProfile?.double?.quantity > 0 &&
                                            seatsProfile?.double?.quantity +
                                                ' x ' +
                                                formatCurrency(seatsProfile?.double?.price, 'vi-VN', {
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
                                <img
                                    width={'100%'}
                                    src="https://files.betacorp.vn/media/images/2024/09/24/b-n-sao-c-a-m-om-m-payoff-poster-kthuoc-facebook-154037-240924-43.jpg"
                                ></img>
                            </div>
                            <div className="col-lg-7 ">
                                <h2 className="title-active mt-5 fs-1">Mộ Đom Đóm</h2>
                                <p style={{ fontFamily: 'Oswald' }} className="mt-3 fs-3 fw-bold ">
                                    2D Phụ đề
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
                                    <p>Hoạt hình, Kịch</p>
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
                                    <p>89 phút</p>
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
                                    <p>Beta Thái Nguyên</p>
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
                                    <p>07/10/2024</p>
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
                                    <p>13:10</p>
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
                                    <p>P2</p>
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
