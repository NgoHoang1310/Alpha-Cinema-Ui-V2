import { useState } from 'react';

// Hàm để lấy giá trị của cookie và chuyển đổi từ JSON
function getCookie(name) {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            try {
                return JSON.parse(c.substring(nameEQ.length, c.length)); // Parse JSON nếu có thể
            } catch (e) {
                return c.substring(nameEQ.length, c.length); // Nếu không phải JSON, trả về chuỗi bình thường
            }
        }
    }
    return null;
}

// Hàm để tạo hoặc cập nhật cookie với JSON
function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (JSON.stringify(value) || '') + expires + '; path=/';
}

// Hàm để xóa cookie
function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

// Custom hook useCookie hỗ trợ JSON
export default function useCookie(cookieName) {
    const [cookie, setCookieState] = useState(() => getCookie(cookieName));

    // Hàm cập nhật cookie và đồng thời cập nhật state
    const updateCookie = (value, days) => {
        setCookie(cookieName, value, days);
        setCookieState(value);
    };

    // Hàm xóa cookie
    const removeCookie = () => {
        deleteCookie(cookieName);
        setCookieState(null);
    };

    return { cookie, updateCookie, removeCookie };
}
