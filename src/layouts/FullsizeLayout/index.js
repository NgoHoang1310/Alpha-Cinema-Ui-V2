import classNames from 'classnames/bind';
import styles from './FullsizeLayout.module.scss';
import Header from '~/layouts/Components/Header';
import Toast from '~/components/Toast';
import { useScrollToTop } from '~/hooks';

const cx = classNames.bind(styles);

function FullsizeLayout({ children }) {
    useScrollToTop();
    return (
        <div>
            <div className={cx('wrapper')}>
                <div style={{ padding: 0 }} className={cx('container-fluid')}>
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
            <Toast
                position="top-center"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}

export default FullsizeLayout;
