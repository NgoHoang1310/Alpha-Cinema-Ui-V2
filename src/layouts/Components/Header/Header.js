import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import images from '~/assets/Images';

import config from '~/configs';
import Button from '~/components/Button';
import Dropdown from '~/components/Dropdown';
const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('row align-items-center')}>
                    <div className={cx('col-2')}>
                        <Link className={cx('logo')} to={config.routes.home}>
                            <img src={images.logo} alt="AlphaCinemas"></img>
                        </Link>
                    </div>
                    <div className={cx('col-2')}>
                        <Dropdown />
                    </div>
                    <div className={cx('col-6 d-flex align-items-center')}>
                        <Link className={cx('navbar-item')} to={config.routes.home}>
                            LỊCH CHIẾU THEO RẠP
                        </Link>
                        <Link className={cx('navbar-item')} to={config.routes.home}>
                            PHIM
                        </Link>
                        <Link className={cx('navbar-item')} to={config.routes.home}>
                            RẠP
                        </Link>
                        <Link className={cx('navbar-item')} to={config.routes.home}>
                            GIÁ VÉ
                        </Link>
                        <Link className={cx('navbar-item')} to={config.routes.home}>
                            TIN TỨC VÀ ƯU ĐÃI
                        </Link>
                    </div>
                    <div className={cx('col-2 d-flex align-items-center')}>
                        <Button to={config.routes.register} outline>
                            Đăng kí
                        </Button>
                        <Button to={config.routes.login} primary>
                            Đăng nhập
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
