import classNames from 'classnames/bind';
import styles from './Schedule.module.scss';

import { useDispatch } from 'react-redux';
import { memo } from 'react';

import { openModal } from '~/store/reducers/modalReducer';

const cx = classNames.bind(styles);
function ScheduleTime() {
    const dispatch = useDispatch();

    return (
        <div className={cx('schedule-time')}>
            <h2>THỜI GIAN: </h2>
            <ul className={cx('time-list')}>
                <li
                    onClick={() => dispatch(openModal({ type: 'booking', isOpen: true, data: {} }))}
                    className={cx('time-item')}
                >
                    18:15
                </li>
            </ul>
        </div>
    );
}

export default memo(ScheduleTime);
