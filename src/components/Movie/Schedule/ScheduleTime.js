import classNames from 'classnames/bind';
import styles from './Schedule.module.scss';

import { memo } from 'react';

const cx = classNames.bind(styles);
function ScheduleTime({ data = [], onTime = () => {} }) {
    return (
        <div className={cx('schedule-time')}>
            <h2>THỜI GIAN: </h2>
            <ul className={cx('time-list')}>
                {data?.map((time, index) => {
                    return (
                        <li key={index} onClick={() => onTime(time)} className={cx('time-item')}>
                            {time}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default memo(ScheduleTime);
