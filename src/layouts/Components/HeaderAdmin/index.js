import classNames from 'classnames/bind';
import styles from './HeaderAdmin.module.scss';
import { Avatar } from '@mui/material';
import config from '~/configs';
import Menu from '~/components/Popper/Menu';
const cx = classNames.bind(styles);
function HeaderAdmin() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Menu items={[]}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </Menu>
            </div>
        </header>
    );
}

export default HeaderAdmin;
