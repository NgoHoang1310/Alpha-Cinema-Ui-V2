import classNames from 'classnames/bind';
import styles from './Seat.module.scss';

import { memo, useRef, useState } from 'react';

import images from '~/assets/Images';

const cx = classNames.bind(styles);
const defaultFn = () => {};
function SeatItem({ type, seat, status, price, onClick = defaultFn, className }) {
    const [currentSeat, setCurrentSeat] = useState({
        seat,
        status,
        type,
        price,
    });

    return (
        <div className={className}>
            <div
                className={cx(currentSeat.status)}
                style={{
                    backgroundImage: `url(${images.seats[type][currentSeat.status]})`,
                    lineHeight: type === 'double' && 'initial',
                }}
                onClick={() => onClick({ currentSeat, setCurrentSeat })}
            >
                {seat}
            </div>
        </div>
    );
}

export default memo(SeatItem);
