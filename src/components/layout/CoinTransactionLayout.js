import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './CoinTransactionLayout.css';
import CustomModal from '../common/CustomModal';

const CoinTransactionLayout = ({ price, showModal, balance, isBuying, message, handleTransaction, handleCloseTransaction }) => {
    const [quantity, setQuantity] = useState(1);
    const totalAmount = quantity * price;
    
    const handleQuantityChange = (event) => {
        setQuantity(Number(event.target.value));
    };

    const handleModalClose = () => {
        handleCloseTransaction();
    }

    const onBuyOrSellClickHandler = () => {
        handleTransaction(quantity);
    }

    return (
        <Container>
            <CustomModal onClick={handleModalClose} show={showModal} message={message} />
            <Row className="checkout-page">
                <Col md={6} className="form-column">
                    <div className="checkout-card">
                        <h2>{isBuying ? 'Buy Coins' : 'Sell Coins'}</h2>
                        <Form>
                            <Form.Group controlId="quantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    min={1}
                                />
                            </Form.Group>
                            <Form.Group controlId="totalAmount">
                                <Form.Label>Total Amount</Form.Label>
                                <Form.Control type="text" value={`$${totalAmount}`} readOnly />
                            </Form.Group>
                            <Button variant="primary" onClick={onBuyOrSellClickHandler}>
                                {isBuying ? 'Buy' : 'Sell'}
                            </Button>
                        </Form>
                    </div>
                </Col>
                <Col md={6} className="balance-column">
                    <div className="checkout-card">
                        <h2>Available Balance</h2>
                        <p>{`$${balance}`}</p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default CoinTransactionLayout;