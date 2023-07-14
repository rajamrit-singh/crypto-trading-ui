import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './BuyCoinPage.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { buyCoin } from '../services/transactionService';
import { getProfile } from '../services/userService';
import { setUser } from '../redux/reducers/userSlice';
import { getListOfCoins } from '../services/coinService';
import { setCoins } from '../redux/reducers/coinSlice';
import { getCoinIdFromUrl } from '../utils/navigationUtils';
import { setCurrentCoin } from '../redux/reducers/currentCoinSlice';

const BuyCoinPage = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coin = useSelector(state => state.currentCoin);
  console.log(coin);
  const [quantity, setQuantity] = useState(1);
  const price = Number(coin.price).toFixed(2); // Replace with the actual price

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleBuyCoin = async () => {
    const transaction = buyCoin(coin.uuid, quantity);
    const updatedProfileWithNewBalance = await getProfile();
    dispatch(setUser(updatedProfileWithNewBalance));
  };

  const totalAmount = quantity * price;

  useEffect(() => {
    if (user.user_id === '') {
      getProfile().then((profile) => {
        dispatch(setUser(profile));
      })
    }
    if (coin.uuid === '') {
      getListOfCoins().then((coins) => {
        dispatch(setCoins(coins));
        const coinId = getCoinIdFromUrl();
        const coin = coins.find(c => c.uuid === coinId);
        dispatch(setCurrentCoin(coin));
      });
    }

  }, [])
  return (
    <Container>
      <Row className="checkout-page">
        <Col md={6} className="form-column">
          <div className="checkout-card">
            <h2>Buy Coins</h2>
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
              <Button variant="primary" onClick={handleBuyCoin}>
                Buy
              </Button>
            </Form>
          </div>
        </Col>
        <Col md={6} className="balance-column">
          <div className="checkout-card">
            <h2>Available Balance</h2>
            <p>{`$${user.balance}`}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BuyCoinPage;
