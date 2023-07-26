import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { buyCoin } from '../services/transactionService';
import { getProfile } from '../services/userService';
import { setUser } from '../redux/reducers/userSlice';
import { getListOfCoins } from '../services/coinService';
import { setCoins } from '../redux/reducers/coinSlice';
import { getCoinIdFromUrl } from '../utils/navigationUtils';
import { setCurrentCoin } from '../redux/reducers/currentCoinSlice';
import UserNavbar from '../components/layout/UserNavbar'
import CoinTransactionLayout from '../components/layout/CoinTransactionLayout';
import { addTransaction } from '../redux/reducers/transactionsSlice';
import { setIsLoading } from '../redux/reducers/globalSlice';

const BuyCoinPage = () => {
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const coin = useSelector(state => state.currentCoin);
  console.log(coin);
  const price = Number(coin.price).toFixed(2); // Replace with the actual price


  const handleBuyCoin = async (quantity) => {
    dispatch(setIsLoading(true));
    const transaction = await buyCoin(coin.uuid, quantity);
    const updatedProfileWithNewBalance = await getProfile();
    dispatch(setIsLoading(false));
    if (transaction?.crypto_id) {
      setMessage('Transaction Successful');
      dispatch(addTransaction(transaction));
      dispatch(setUser(updatedProfileWithNewBalance));
      dispatch(setIsLoading(false));
    } else {
      setMessage(transaction.response.data);
    }
    setShowModal(true);
  };

  const handleCloseTransaction = () => {
    if (message === 'Transaction Successful') {
      navigate(`/${userId}/transactions`)
    }
  }

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
        showModal={showModal}
        balance={user.balance}
        isBuying={true}
        message={message}
        handleTransaction={handleBuyCoin}
        handleCloseTransaction={handleCloseTransaction}
      />
    </>
  );
};

export default BuyCoinPage;
