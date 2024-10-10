import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import { AuthGuard } from './hoc/Guard';
import { privateRoutes, publicRoutes } from './routes';
import { DefaultLayout } from './layouts';

import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { Modal, ModalBody } from 'reactstrap';
import Toast from '~/components/Toast';
import Trailer from '~/components/Trailer';
import { openModal } from '~/store/reducers/modalReducer';
import { ScheduleDate, ScheduleTime } from '~/components/Movie/Schedule';
import Button from '~/components/Button';
import config from '~/configs';

function App() {
    const { type, isOpenModal, data } = useSelector((state) => state.modal);
    const { isAuthenticated } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const handleSubmit = useCallback(() => {
        if (!isAuthenticated) return (window.location.href = config.routes.login);
    }, []);
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
                    isOpen={type === 'trailer' && isOpenModal}
                    toggle={() => dispatch(openModal(false))}
                >
                    <ModalBody style={{ padding: 24 }}>
                        <h1 className="modal-heading">TRAILER - {data?.title} </h1>
                        <Trailer style={{ padding: 15 }} link={data?.link} />
                    </ModalBody>
                </Modal>
                <Modal
                    centered
                    style={{ maxWidth: 700 }}
                    isOpen={type === 'booking' && isOpenModal}
                    toggle={() => dispatch(openModal(false))}
                >
                    <ModalBody style={{ padding: 24 }}>
                        <h1 className="modal-heading">BẠN ĐANG ĐẶT VÉ XEM PHIM </h1>
                        <h2 className="modal-heading text-active" style={{ fontSize: '3.3rem', textAlign: 'center' }}>
                            Kumanthong
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
                                        Beta Thanh Xuân
                                    </th>
                                    <th
                                        style={{
                                            textAlign: 'center',
                                            width: '30%',
                                            fontSize: '2.3rem',
                                            padding: '16px 0',
                                        }}
                                    >
                                        06/10/2024
                                    </th>
                                    <th
                                        style={{
                                            textAlign: 'center',
                                            width: '30%',
                                            fontSize: '2.3rem',
                                            padding: '16px 0',
                                        }}
                                    >
                                        18:45
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
                <Modal
                    centered
                    style={{ maxWidth: 900 }}
                    isOpen={type === 'schedule' && isOpenModal}
                    toggle={() => dispatch(openModal(false))}
                >
                    <ModalBody style={{ padding: 24, minHeight: 350 }}>
                        <h1 style={{ textAlign: 'center' }} className="modal-heading">
                            RẠP BETA THÁI NGUYÊN{' '}
                        </h1>
                        <ScheduleDate />
                        <div style={{ marginBottom: 24 }} className="break-bar"></div>
                        <ScheduleTime />
                    </ModalBody>
                </Modal>
            </div>
        </Router>
    );
}

export default App;
