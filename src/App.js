import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { AuthGuard } from './hoc/Guard';
import { privateRoutes, publicRoutes } from './routes';
import { DefaultLayout } from './layouts';

import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Toast from '~/components/Toast';
import Trailer from '~/components/Trailer';
import { openModal, closeModal } from '~/store/reducers/modalReducer';
import { useCookie } from './hooks';
import Button from '~/components/Button';
import { CloseIcon } from './components/Icons';
import config from '~/configs';
import Schedule from './components/Modal';

function App() {
    const { booking, trailer } = useSelector((state) => state.modal);
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { currentTheater } = useSelector((state) => state.theater);
    const { updateCookie } = useCookie('currentSchedule');

    const dispatch = useDispatch();

    const handleSubmit = useCallback(() => {
        console.log(booking);

        if (!isAuthenticated) return (window.location.href = config.routes.login);
        updateCookie(booking);
        window.location.href = config.routes.seatSelection;
    }, [booking?.movie]);

    function renderRoute(route, index, isPrivate = false) {
        let Layout = route.layout ?? (route.layout === null ? Fragment : DefaultLayout);
        let Page = route.component;
        return (
            <Route
                key={index}
                path={route.path}
                element={
                    <Layout>
                        {isPrivate ? (
                            <AuthGuard>
                                <Page />
                            </AuthGuard>
                        ) : (
                            <Page />
                        )}
                    </Layout>
                }
            />
        );
    }

    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => renderRoute(route, index))}
                    {privateRoutes.map((route, index) => renderRoute(route, index, true))}
                </Routes>
                <Toast
                    position="top-center"
                    autoClose={1000}
                    hideProgressBar={true}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <Modal
                    centered
                    style={{ maxWidth: 700 }}
                    isOpen={Object.keys(trailer).length > 0}
                    toggle={() => dispatch(closeModal('trailer'))}
                >
                    <ModalHeader className="d-fles justify-content-end">
                        <Button
                            onClick={() => {
                                dispatch(closeModal('trailer'));
                            }}
                        >
                            <FontAwesomeIcon icon={faWindowClose} />
                        </Button>
                    </ModalHeader>
                    <ModalBody style={{ padding: 24 }}>
                        <h1 className="modal-heading">TRAILER - {trailer?.title} </h1>
                        <Trailer style={{ padding: 15 }} link={trailer?.link} />
                    </ModalBody>
                </Modal>
                <Modal centered style={{ maxWidth: 700 }} isOpen={Object.keys(booking).length > 0}>
                    <ModalHeader className="d-fles justify-content-end">
                        <Button
                            onClick={() => {
                                dispatch(closeModal('booking'));
                            }}
                        >
                            <FontAwesomeIcon icon={faWindowClose} />
                        </Button>
                    </ModalHeader>
                    <ModalBody style={{ padding: 24 }}>
                        <h1 className="modal-heading">BẠN ĐANG ĐẶT VÉ XEM PHIM </h1>
                        <h2 className="modal-heading text-active" style={{ fontSize: '3.3rem', textAlign: 'center' }}>
                            {booking?.movie?.title}
                        </h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{ textAlign: 'center', width: '30%', padding: '16px 0' }}>Rạp chiếu</td>
                                    <td style={{ textAlign: 'center', width: '30%', padding: '16px 0' }}>Ngày chiếu</td>
                                    <td style={{ textAlign: 'center', width: '30%', padding: '16px 0' }}>Giờ chiếu</td>
                                </tr>
                                <tr>
                                    <th
                                        style={{
                                            textAlign: 'center',
                                            width: '30%',
                                            fontSize: '2.3rem',
                                            padding: '16px 0',
                                        }}
                                    >
                                        {currentTheater.theater}
                                    </th>
                                    <th
                                        style={{
                                            textAlign: 'center',
                                            width: '30%',
                                            fontSize: '2.3rem',
                                            padding: '16px 0',
                                        }}
                                    >
                                        {booking?.date}
                                    </th>
                                    <th
                                        style={{
                                            textAlign: 'center',
                                            width: '30%',
                                            fontSize: '2.3rem',
                                            padding: '16px 0',
                                        }}
                                    >
                                        {booking?.time}
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                        <div className="break-bar"></div>
                        <div className="d-flex justify-content-center mt-3 mb-3">
                            <Button onClick={handleSubmit} primary>
                                Đồng ý
                            </Button>
                        </div>
                    </ModalBody>
                </Modal>
                <Schedule />
            </div>
        </Router>
    );
}

export default App;
