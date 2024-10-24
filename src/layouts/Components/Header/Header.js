import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import images from '~/assets/Images';
import Menu from '~/components/Popper/Menu';
import config from '~/configs';
import Button from '~/components/Button';
import Dropdown from '~/components/Dropdown';
import * as apiServices from '~/services';
import { logOut } from '~/store/reducers/authReducer';
import { setCurrentTheater } from '~/store/reducers/theaterReducer';
const cx = classNames.bind(styles);

function Header() {
    const { isAuthenticated, currentUser } = useSelector((state) => state.auth);
    const { currentTheater } = useSelector((state) => state.theater);
    const [theaters, setTheaters] = useState([]);
    const dispatch = useDispatch();
    const handleLogOut = useCallback(async () => {
        const response = await apiServices.logOut(currentUser.id);
        if (response.code === 200) {
            dispatch(logOut());
            localStorage.clear();
            setTimeout(() => {
                window.location.href = '/';
            }, 800);
        }
    }, []);

    const handleChangeTheater = (value) => {
        const currentTheater = theaters.find((theater) => {
            return theater?.children?.data?.includes(value);
        });
        console.log(currentTheater);

        if (!Object.keys(currentTheater).length > 0) return;
        dispatch(
            setCurrentTheater({
                province: currentTheater.title,
                theater: value.title,
            }),
        );
    };

    useEffect(() => {
        const fetchApi = async () => {
            const res = await apiServices.getTheaters();
            const theater = {
                icon: <FontAwesomeIcon icon={faChevronRight} />,
                title: '',
                children: {
                    data: [],
                },
            };

            const theaters = new Map();

            res?.forEach((element) => {
                const { province, district } = element;
                if (theaters.has(province)) {
                    // Nếu đã tồn tại province, thêm district vào mảng 'data'
                    theaters.get(province).children.data.push({ title: district });
                } else {
                    // Nếu chưa tồn tại, thêm một entry mới
                    theaters.set(province, {
                        ...theater,
                        title: province,
                        children: {
                            data: [{ title: district }],
                        },
                    });
                }
            });

            setTheaters(Array.from(theaters.values()));
        };

        fetchApi();
    }, []);
    return (
        <header className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('row align-items-center')}>
                    <div className={cx('col-lg-2 col-md-3 col-sm-2')}>
                        <Link className={cx('logo')} to={config.routes.home}>
                            <img src={images.logo} alt="AlphaCinemas"></img>
                        </Link>
                    </div>
                    <div className={cx('col-lg-2 col-md-3 col-sm-2')}>
                        <Dropdown
                            initial={currentTheater?.theater || theaters[0]?.title}
                            onClick={handleChangeTheater}
                            options={theaters}
                            className={cx('menu-theater')}
                        />
                    </div>
                    <div className={cx('col-lg-5 col-md-2 col-sm-2 d-flex align-items-center')}>
                        <div className={cx('navbar')}>
                            <Link className={cx('navbar-item')} to={config.routes.schedule}>
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
                    </div>
                    <div className={cx('col-lg-3 col-md-4 col-sm-6 d-flex justify-content-end align-items-center')}>
                        {!isAuthenticated ? (
                            <div className={cx('auth-button')}>
                                <Button to={config.routes.register} outline>
                                    Đăng kí
                                </Button>
                                <Button to={config.routes.login} primary>
                                    Đăng nhập
                                </Button>
                            </div>
                        ) : (
                            <Menu items={config.menus.MENU_USERS} onChange={handleLogOut}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                            </Menu>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
