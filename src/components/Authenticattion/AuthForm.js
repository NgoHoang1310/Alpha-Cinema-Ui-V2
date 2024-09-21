import classNames from 'classnames/bind';
import styles from './AuthForm.module.scss';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Button from '../Button';
import images from '~/assets/Images';

import * as apiServices from '~/services';
import config from '~/configs';
import { Validator } from '~/utils/validation';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);
function AuthForm({ type = 'register' }) {
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleChange = (e, callback) => {
        callback(e.target.value);
    };

    const handleRegister = async (payload) => {
        const response = await apiServices.handleRegister(payload);
        let statusCode = response?.code;

        switch (statusCode) {
            case 201: {
                toast('Đăng kí thành công !');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 800);
                break;
            }
            case 409: {
                toast('Email này đã được sử dụng !');
                break;
            }

            default: {
                toast('Đã xảy ra lỗi. Vui lòng thử lại !');
                break;
            }
        }
    };

    const handleLogin = async (payload) => {
        const response = await apiServices.handleLogin(payload);
        let statusCode = response?.code;

        switch (statusCode) {
            case 200: {
                toast('Đăng nhập thành công !');
                setTimeout(() => {
                    window.location.href = '/';
                }, 800);
                break;
            }
            case 404: {
                toast('Tài khoản không tồn tại !');
                break;
            }
            case 409: {
                toast('Mật khẩu không chính xác !');
                break;
            }

            default: {
                toast('Đã xảy ra lỗi. Vui lòng thử lại !');
                break;
            }
        }
    };

    useEffect(() => {
        Validator({
            form: '#form-1',
            errorSelector: '.form-message',
            formGroupSelector: '.mb-3',
            rules: [
                Validator.isRequire('#formUserName'),
                Validator.isRequire('#formEmail'),
                Validator.isRequire(`#formPassword`),
                Validator.isRequire(`#formPasswordVerification`),
                Validator.isRequire(`#formPhone`),
                Validator.isRequire(`#formDob`),
                Validator.isEmail('#formEmail'),
                Validator.isPassword(`#formPassword`, 6),
                Validator.isPhone('#formPhone'),
                Validator.isDob('#formDob'),
                Validator.isConfirm(
                    `#formPasswordVerification`,
                    function () {
                        return document.querySelector(`#formPassword`).value;
                    },
                    'Mật khẩu nhập lại không chính xác',
                ),
            ],
            onsubmit: function (data) {
                const payload = data;
                delete payload['passwordConfirm'];
                if (type === 'login') {
                    handleLogin(payload);
                }

                if (type === 'register') {
                    handleRegister(payload);
                }
            },
        });
    }, []);
    return (
        <form className={cx('validation')} id="form-1">
            <div className={cx('form-validation__header')}>
                <div className="row align-items-center">
                    <div className={cx('col')}>
                        <Link to={config.routes.home}>
                            <img src={images.logo} alt="AlphaCinemas" style={{ height: '50px' }}></img>
                        </Link>
                    </div>
                    <div className={cx('col')}>
                        <Button to={config.routes.register} primary={type === 'register'} outline={type === 'login'}>
                            Đăng kí
                        </Button>
                        <Button to={config.routes.login} primary={type === 'login'} outline={type === 'register'}>
                            Đăng nhập
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('form-validation__body')}>
                <div className="row">
                    {type === 'register' && (
                        <div className="col mb-3">
                            <label htmlFor="formUserName" className={cx('form-label')}>
                                Tên đăng nhập
                            </label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                id="formUserName"
                                name="userName"
                                placeholder="VD: Hoàng Ngô"
                                value={userName}
                                onChange={(e) => handleChange(e, setUserName)}
                            />
                            <span className={cx('form-message')}></span>
                        </div>
                    )}
                    <div className="col mb-3">
                        <label htmlFor="formEmail" className={cx('form-label')}>
                            Email
                        </label>
                        <input
                            type="email"
                            className={cx('form-control')}
                            id="formEmail"
                            name="email"
                            placeholder="VD: email@domain.com"
                            value={email}
                            onChange={(e) => handleChange(e, setEmail)}
                        />
                        <span className={cx('form-message')}></span>
                    </div>
                </div>
                <div className="row">
                    <div className={cx(type === 'register' && 'col', 'mb-3')}>
                        <label htmlFor="formPassword" className={cx('form-label')}>
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            className={cx('form-control')}
                            id="formPassword"
                            name="password"
                            placeholder="Nhập mật khẩu"
                            value={password}
                            onChange={(e) => handleChange(e, setPassword)}
                        />
                        <span className={cx('form-message')}></span>
                    </div>
                    <div className={cx(type === 'register' && 'col', 'mb-3')}>
                        <label htmlFor="formPasswordVerification" className={cx('form-label')}>
                            Xác nhận mật khẩu
                        </label>
                        <input
                            type="password"
                            className={cx('form-control')}
                            id="formPasswordVerification"
                            name="passwordConfirm"
                            placeholder="Xác nhận mật khẩu"
                            value={passwordConfirm}
                            onChange={(e) => handleChange(e, setPasswordConfirm)}
                        />
                        <span className={cx('form-message')}></span>
                    </div>
                </div>
                {type === 'register' && (
                    <div className="row">
                        <div className="col mb-3">
                            <label htmlFor="formDob" className={cx('form-label')}>
                                Ngày sinh
                            </label>
                            <input
                                className={cx('form-control')}
                                id="formDob"
                                name="dob"
                                placeholder="VD: 13/10/2003"
                                value={dob}
                                onChange={(e) => handleChange(e, setDob)}
                            />
                            <span className={cx('form-message')}></span>
                        </div>
                        <div className="col mb-3">
                            <label htmlFor="formGender" className={cx('form-label')}>
                                Giới tính
                            </label>
                            <select
                                onChange={(e) => handleChange(e, setGender)}
                                id="formGender"
                                name="gender"
                                className={cx('form-select')}
                                value={gender}
                            >
                                <option value={'MALE'}>Nam</option>
                                <option value={'FEMALE'}>Nữ</option>
                            </select>
                            <span className={cx('form-message')}></span>
                        </div>
                    </div>
                )}
                {type === 'register' && (
                    <div className="row">
                        <div className="col-6 mb-3">
                            <label htmlFor="formPhone" className={cx('form-label')}>
                                Số điện thoại
                            </label>
                            <input
                                type="text"
                                className={cx('form-control')}
                                id="formPhone"
                                name="phone"
                                placeholder="VD: 0343027930"
                                value={phone}
                                onChange={(e) => handleChange(e, setPhone)}
                            />
                            <span className={cx('form-message')}></span>
                        </div>
                    </div>
                )}
                <div className={cx('check-password', 'mb-3')}>
                    <input style={{ marginRight: 4 }} type="checkbox" className="checkbox-btn mt-3" value="off" />
                    Hiện mật khẩu
                </div>

                <Button type={'submit'} primary large>
                    {(type === 'login' && 'Đăng nhập') || (type === 'register' && 'Đăng kí')}
                </Button>
            </div>
        </form>
    );
}

export default AuthForm;
