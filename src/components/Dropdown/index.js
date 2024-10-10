import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Menu from '../Popper/Menu';
import config from '~/configs';

const cx = classNames.bind(styles);
function Dropdown({ options = ['Hà Nội', 'Thái Bình'], className }) {
    return (
        <div className={cx('wrapper', className)}>
            <Menu items={config.menus.MENU_ITEMS}>
                <div className={cx('dropdown')}>
                    {config.menus.MENU_ITEMS[0].title}
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </Menu>
        </div>
    );
}

export default Dropdown;
