import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sellCoin } from '../services/transactionService';
import { getProfile } from '../services/userService';
import { setUser } from '../redux/reducers/userSlice';
import { getCoinById, getListOfCoins } from '../services/coinService';
import { setCoins } from '../redux/reducers/coinSlice';
import { getCoinIdFromUrl } from '../utils/navigationUtils';
import { setCurrentCoin } from '../redux/reducers/currentCoinSlice';
import UserNavbar from '../components/layout/UserNavbar'
import CoinTransactionLayout from '../components/layout/CoinTransactionLayout';
import { setIsLoading } from '../redux/reducers/globalSlice';

const SellCoinsPage = () => {
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, coinId } = useParams();
  const coin = useSelector(state => state.currentCoin);
  const price = Number(coin.price).toFixed(2) || 0; // Replace with the actual price


  const handleSellCoin = async (quantity) => {
    const transaction = await sellCoin(coin.uuid, quantity);
    const updatedProfileWithNewBalance = await getProfile();
    setShowModal(true);
    if (transaction?.crypto_id) {
      setMessage('Transaction Successful');
      dispatch(setUser(updatedProfileWithNewBalance));
    } else {
      setMessage(transaction.response.data);
    }
  };

  const handleCloseTransaction = () => {
    if (message === 'Transaction Successful') {
      navigate(`/${userId}/transactions`)
    }
  }

  useEffect(() => {
    dispatch(setIsLoading(true));
    if (user.user_id === '') {
      getProfile().then((profile) => {
        dispatch(setUser(profile));
      });
    }
    getCoinById(coinId).then((coin) => {
      dispatch(setCurrentCoin(coin));
      dispatch(setIsLoading(false));
    });
  }, [])
  return (
    <>
    <UserNavbar />
    <CoinTransactionLayout
      price={!!price ? price : 0}
      showModal={showModal}
      handleTransaction={handleSellCoin}
      balance={user.balance}
      isBuying={false}
      message={message}
      handleCloseTransaction={handleCloseTransaction}
    />
    </>
  );
};

export default SellCoinsPage;
