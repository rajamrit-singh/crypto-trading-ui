import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './CustomModal.css';

const CustomModal = ({ message, onClick, show }) => {
    return (
        <Modal show={show} onHide={onClick} backdrop="static" keyboard={false}>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onClick}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;
