import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { logIn, logOut, setUser } from '~/store/reducers/authReducer';
import * as apiServices from '~/services';
function AuthProvider({ children }) {
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            try {
                let token = JSON.parse(localStorage.getItem('token'));
                if (!token?.accessToken) {
                    dispatch(logOut());
                    return;
                }
                const user = await apiServices.getMe();
                if (user) {
                    dispatch(logIn());
                    dispatch(setUser(user));
                }
            } catch (error) {
                if (error?.response?.status === 401) {
                    dispatch(logOut());
                    toast('Phiên đăng nhập hết hạn !');
                }
            }
        })();
    }, []);

    return children;
}

export default AuthProvider;
