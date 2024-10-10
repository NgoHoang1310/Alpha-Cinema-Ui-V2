import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

import Header from '~/layouts/Components/Header';
import { useScrollToTop } from '~/hooks';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    useScrollToTop();

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
