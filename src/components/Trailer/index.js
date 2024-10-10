import classNames from 'classnames/bind';
import styles from './Trailer.module.scss';

const cx = classNames.bind(styles);

function Trailer({ link, style }) {
    return (
        <div style={style} className={cx('trailer-video')}>
            <div className={cx('trailer-video__frame')}>
                <iframe src={link?.replace('watch?v=', 'embed/')}></iframe>
            </div>
        </div>
    );
}

export default Trailer;
