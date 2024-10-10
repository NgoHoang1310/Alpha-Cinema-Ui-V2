import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import config from '~/configs';

function AuthGuard({ children }) {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) return navigate(config.routes.login);
    }, []);

    return children;
}
export default AuthGuard;
