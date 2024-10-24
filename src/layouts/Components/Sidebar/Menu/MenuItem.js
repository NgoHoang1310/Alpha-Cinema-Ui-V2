import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function MenuItem({ title, icon, to, requireAuth = false }) {
    const handlePreventDefault = (e) => {};
    return (
        <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to} onClick={handlePreventDefault}>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    to: PropTypes.string.isRequired,
};

export default MenuItem;
