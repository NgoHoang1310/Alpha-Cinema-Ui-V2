import { useState } from 'react';

function useSessionStorage(key, initialValue) {
    // Lấy giá trị từ sessionStorage, hoặc sử dụng giá trị khởi tạo
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Lấy item từ sessionStorage
            const item = window.sessionStorage.getItem(key);
            // Nếu có giá trị, chuyển về dạng object, nếu không, dùng giá trị khởi tạo
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    // Hàm để lưu giá trị mới vào sessionStorage
    const setValue = (value) => {
        try {
            // Nếu giá trị là một hàm, thì gọi hàm đó để lấy giá trị mới
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            // Lưu giá trị mới vào state
            setStoredValue(valueToStore);
            // Lưu giá trị mới vào sessionStorage
            window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

export default useSessionStorage;
