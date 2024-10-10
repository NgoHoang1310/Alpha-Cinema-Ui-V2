import { useState, useEffect } from 'react';

const useCountdown = (initialMinutes, callback = () => {}) => {
    const [time, setTime] = useState(initialMinutes * 60); // Chuyển đổi phút sang giây

    useEffect(() => {
        if (time === 0) {
            callback();
            return;
        } // Dừng đếm ngược khi thời gian đạt 0

        const intervalId = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000); // Cập nhật mỗi giây

        // Hủy bỏ interval khi component bị unmount hoặc time đạt 0
        return () => clearInterval(intervalId);
    }, [time]);

    const minutes = Math.floor(time / 60); // Tính phút
    const seconds = time % 60 < 10 ? '0' + (time % 60) : time % 60; // Tính giây còn lại

    return { minutes, seconds }; // Trả về phút và giây
};

export default useCountdown;
