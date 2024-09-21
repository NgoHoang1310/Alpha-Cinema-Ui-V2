import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import Carousel from 'react-bootstrap/Carousel';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <Carousel style={{ width: '100%' }}>
                <Carousel.Item>
                    <img
                        width={'100%'}
                        src="https://files.betacorp.vn/media/images/2024/09/17/cover-cam-173555-170924-48.png"
                    ></img>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        width={'100%'}
                        src="https://files.betacorp.vn/media/images/2024/09/17/cover-cam-173555-170924-48.png"
                    ></img>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        width={'100%'}
                        src="https://files.betacorp.vn/media/images/2024/09/17/cover-cam-173555-170924-48.png"
                    ></img>
                </Carousel.Item>
            </Carousel>
            <div className="container">Home</div>
        </div>
    );
}

export default Home;
