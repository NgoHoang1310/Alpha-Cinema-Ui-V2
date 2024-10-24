import classNames from 'classnames/bind';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { closeModal } from '~/store/reducers/modalReducer';
import Button from '~/components/Button';

// import styles from './MovieList.module.scss';

// const cx = classNames.bind(styles);
function ModifyUser() {
    const { modifyUser } = useSelector((state) => state.modal);
    const dispatch = useDispatch();
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <Modal
            centered
            style={{ maxWidth: 700 }}
            isOpen={Object.keys(modifyUser).length > 0}
            toggle={() => dispatch(closeModal('modifyUser'))}
        >
            <ModalHeader title="Thêm tài khoản" className="d-flex justify-content-end">
                <Button
                    onClick={() => {
                        dispatch(closeModal('modifyUser'));
                    }}
                >
                    <FontAwesomeIcon icon={faWindowClose} />
                </Button>
            </ModalHeader>
            <ModalBody style={{ padding: 24 }}>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3 fs-2">
                        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                            <Form.Label>Tên tài khoản</Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                <Form.Control
                                    className="fs-3"
                                    type="text"
                                    placeholder="VD: hoangdctt24"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">Please choose a username.</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom01">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                className="fs-3"
                                required
                                type="email"
                                placeholder="VD: ngohoang1310@gmail.com"
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" controlId="validationCustom02">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control className="fs-3" required type="text" placeholder="VD: 0343027930" />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3 fs-3">
                        <Form.Group as={Col} md="8" controlId="formFile" className="mb-3">
                            <Form.Label>Chọn ảnh đại diện</Form.Label>
                            <Form.Control className="fs-3" placeholder="Chọn tệp" type="file" />
                        </Form.Group>
                        <Col md="4">
                            <Image src="https://free.minimals.cc/assets/images/avatar/avatar-22.webp" roundedCircle />
                        </Col>
                    </Row>
                    <Row className="mb-3 fs-3">
                        <Form.Group as={Col} md="4" controlId="formFile" className="mb-3">
                            <Form.Label>Ngày sinh</Form.Label>
                            <Form.Control className="fs-3" type="text" />
                        </Form.Group>
                    </Row>
                    <Button className="success" type="submit">
                        Tạo mới
                    </Button>
                </Form>
            </ModalBody>
        </Modal>
    );
}

export default ModifyUser;
