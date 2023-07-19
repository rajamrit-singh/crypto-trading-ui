import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sellCoin } from '../services/transactionService';
import { getProfile } from '../services/userService';
import { setUser } from '../redux/reducers/userSlice';
import { getListOfCoins } from '../services/coinService';
import { setCoins } from '../redux/reducers/coinSlice';
import { getCoinIdFromUrl } from '../utils/navigationUtils';
import { setCurrentCoin } from '../redux/reducers/currentCoinSlice';
import UserNavbar from '../components/layout/UserNavbar'
import CoinTransactionLayout from '../components/layout/CoinTransactionLayout';

const SellCoinsPage = () => {
  const [message, setMessage] = useState('');
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coin = useSelector(state => state.currentCoin);
  const price = Number(coin.price).toFixed(2) || 0; // Replace with the actual price


  const handleSellCoin = async (quantity) => {
    const transaction = await sellCoin(coin.uuid, quantity);
    const updatedProfileWithNewBalance = await getProfile();
    if (transaction?.crypto_id) {
      setMessage('Transaction Successful');
      dispatch(setUser(updatedProfileWithNewBalance));
    } else {
      setMessage(transaction.response.data);
    }
  };


  useEffect(() => {
    if (user.user_id === '') {
      getProfile().then((profile) => {
        dispatch(setUser(profile));
      });
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
    <>
    <UserNavbar />
    <CoinTransactionLayout
      price={price}
      handleTransaction={handleSellCoin}
      balance={user.balance}
      isBuying={false}
      message={message}
    />
    </>
  );
};

export default SellCoinsPage;
