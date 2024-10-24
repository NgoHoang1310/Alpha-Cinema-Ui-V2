import classNames from 'classnames/bind';
import styles from './Dropdown.module.scss';

import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Menu from '../Popper/Menu';

const cx = classNames.bind(styles);
function Dropdown({ initial, options = [], className, onClick = () => {} }) {
    return (
        <div className={cx('wrapper', className)}>
            <Menu items={options} onChange={onClick}>
                <div className={cx('dropdown')}>
                    {initial}
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </Menu>
        </div>
    );
}

export default Dropdown;
