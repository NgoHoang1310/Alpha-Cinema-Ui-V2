import classNames from 'classnames/bind';
import styles from './Seat.module.scss';
import { memo, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentSeats } from '~/store/reducers/bookingReducer';

import SeatItem from './SeatItem';
const cx = classNames.bind(styles);
function SeatList({ rows = [], seats = [] }) {
    const dispatch = useDispatch();
    const seatsSelected = [];

    const handleClickOnSeat = useCallback((object) => {
        switch (object?.currentSeat.status) {
            case 'SELECTED': {
                const index = seatsSelected.findIndex((item) => item.seat === object?.currentSeat?.seat);
                if (index !== -1) {
                    seatsSelected.splice(index, 1);
                }
                object?.setCurrentSeat({ ...object?.currentSeat, status: 'EMPTY' });
                break;
            }
            case 'EMPTY': {
                seatsSelected.push({ ...object?.currentSeat, seat: object?.currentSeat?.seat });
                object?.setCurrentSeat({ ...object?.currentSeat, status: 'SELECTED' });
                break;
            }

            default:
                return;
        }
        dispatch(setCurrentSeats(seatsSelected));
    });

    return (
        <div className={cx('wrapper')}>
            {rows.map((row, index) => {
                return (
                    <div key={index} className={cx('seat-row')}>
                        {seats.map((seat) => {
                            return (
                                seat?.seat === row && (
                                    <SeatItem
                                        key={seat?.id}
                                        className={cx('seat-item')}
                                        onClick={handleClickOnSeat}
                                        seat={seat?.seat + seat?.number}
                                        type={seat['type']?.type}
                                        status={seat?.status}
                                        price={seat['type']?.price}
                                    />
                                )
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}

export default memo(SeatList);
