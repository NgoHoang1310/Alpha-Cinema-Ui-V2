import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';

import config from '~/configs';
import { Link } from 'react-router-dom';
import Menu, { MenuItem } from '~/layouts/Components/Sidebar/Menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { HomeIcon, UserFollowerIcon } from '~/components/Icons';

import images from '~/assets/Images';

import { useCallback, useEffect, useState, useRef } from 'react';

import * as apiService from '~/services';

const cx = classNames.bind(styles);
function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <div className="mb-3">
                <Link className={cx('logo')} to={config.routes.home}>
                    <img src={images.logo} alt="AlphaCinemas"></img>
                </Link>
            </div>
            <Menu>
                <MenuItem title="Trang chủ" icon={<HomeIcon />} to={config.routes.admin.dashBoard} />
                <MenuItem
                    title="Tài khoản"
                    icon={<FontAwesomeIcon width={'3.2rem'} height={'3.2rem'} icon={faUser} />}
                    to={config.routes.admin.user}
                />
            </Menu>
        </aside>
    );
}

export default Sidebar;
