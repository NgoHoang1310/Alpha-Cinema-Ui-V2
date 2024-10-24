import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';

import Sidebar from '../Components/Sidebar';
import HeaderAdmin from '../Components/HeaderAdmin';

const cx = classNames.bind(styles);
function AdminLayout({ children }) {
    return (
        <div className="fluid-container">
            <div className="row">
                <div className="col-2">
                    <Sidebar />
                </div>
                <div className="col-10 position-relative">
                    <HeaderAdmin />
                    <div className={cx('content')}>{children}</div>
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
