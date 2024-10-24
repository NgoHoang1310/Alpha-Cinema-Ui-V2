import classNames from 'classnames/bind';
import styles from './Seat.module.scss';

import { memo, useState } from 'react';

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
                style={{
                    backgroundImage: `url(${images.seats[type][currentSeat.status]})`,
                    lineHeight: type === 'DOUBLE' && 'initial',
                    color: currentSeat.status === 'EMPTY' && 'black',
                }}
                onClick={() => onClick({ currentSeat, setCurrentSeat })}
            >
                {seat}
            </div>
        </div>
    );
}

export default memo(SeatItem);
