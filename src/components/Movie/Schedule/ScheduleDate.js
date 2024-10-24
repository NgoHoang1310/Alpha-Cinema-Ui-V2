import classNames from 'classnames/bind';
import styles from './Schedule.module.scss';
import { useState, memo } from 'react';

const MOCK_SCHEDULE_DAYS = [
    '2024-10-05',
    '2024-10-06',
    '2024-10-07',
    '2024-10-08',
    '2024-10-09',
    '2024-10-10',
    '2024-10-11',
    '2024-10-12',
    '2024-10-13',
    '2024-10-14',
    '2024-10-15',
];

const DAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
const cx = classNames.bind(styles);
function ScheduleDate({ days = [], currentDay, onDay }) {
    return (
        <div className={cx('schedule-date')}>
            <ul className={cx('schedule-date__list')}>
                {days.map((day, index) => {
                    let date = new Date(day);
                    return (
                        <li
                            key={index}
                            className={cx(
                                'schedule-date__list--item',
                                days.indexOf(currentDay) > 7 && 'smaller',
                                currentDay === day && 'navbar-active',
                            )}
                            onClick={() => {
                                onDay(day);
                            }}
                        >
                            <span>{date.getDate()}</span>/{date.getMonth() + 1} - {DAYS[date.getDay()]}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default memo(ScheduleDate);
