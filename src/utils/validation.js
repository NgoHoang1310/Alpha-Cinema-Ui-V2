import classNames from 'classnames/bind';
import styles from '~/components/Authenticattion/AuthForm.module.scss';

const cx = classNames.bind(styles);

function Validator(options) {
    //* get parents element
    function getParent(element, selector) {
        while (element?.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    var getElementForm = document.querySelector(options.form);
    var selectorRules = {};
    //* handle error
    function validate(inputElement, rule) {
        var rules = selectorRules[rule.selector];
        var errorMessage;
        var getMessage = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        for (var i = 0; i < rules.length; i++) {
            errorMessage = rules[i](inputElement?.value);
            if (errorMessage) break;
        }
        if (errorMessage) {
            getMessage.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add(cx('invalid'));
        } else {
            getMessage.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove(cx('invalid'));
        }
        //* handle when user login
        inputElement.oninput = function () {
            getMessage.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove(cx('invalid'));
        };
        return !errorMessage;
    }

    if (getElementForm) {
        //* handle submit button
        getElementForm.onsubmit = function (e) {
            e.preventDefault();
            var isFormValid = true;
            options.rules.forEach(function (rule) {
                var inputElement = getElementForm.querySelector(rule.selector);
                if (inputElement) {
                    var isValid = validate(inputElement, rule);
                    if (!isValid) {
                        isFormValid = false;
                    }
                }
            });

            if (isFormValid) {
                if (typeof options.onsubmit === 'function') {
                    var isEnable = getElementForm.querySelectorAll('[name]');
                    var formValue = Array.from(isEnable).reduce(function (value, input) {
                        value[input.name] = input.value;
                        return value;
                    }, {});
                    options.onsubmit(formValue);
                }
            }
        };

        options.rules.forEach(function (rule) {
            //* get all rules of environment
            var inputElement = getElementForm.querySelector(rule.selector);
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            if (inputElement) {
                inputElement.onblur = function () {
                    validate(inputElement, rule);
                };
            }
        });
    }
    //* handle showing password button
    var showMessage = document.querySelector('.checkbox-btn');
    showMessage.onclick = function () {
        if (!showMessage.checked) {
            document.querySelector('#formPassword').type = 'password';
            document.querySelector('#formPasswordVerification').type = 'password';
        } else {
            document.querySelector('#formPassword').type = 'Text';
            document.querySelector('#formPasswordVerification').type = 'Text';
        }
    };
}

//* check name
Validator.isRequire = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value ? undefined : message || 'Vui lòng nhập trường này';
        },
    };
};

//* check email
Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regux = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regux.test(value) ? undefined : message || 'Email không hợp lệ';
        },
    };
};
//* check password
Validator.isPassword = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự`;
        },
    };
};

Validator.isPhone = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            //* regux check phone number
            var regux = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
            return regux.test(value) ? undefined : message || 'Số điện thoại không hợp lệ';
        },
    };
};

Validator.isDob = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            //* regux check date of birth
            var regux = /\d{1,2}\/\d{1,2}\/\d{2,4}/;
            return regux.test(value) ? undefined : message || 'Ngày sinh không hợp lệ';
        },
    };
};

//* check password confirmination
Validator.isConfirm = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Dữ liệu nhập lại không chính xác';
        },
    };
};

export { Validator };
