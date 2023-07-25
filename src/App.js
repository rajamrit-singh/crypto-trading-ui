import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import UserHomePage from './pages/UserHomePage';
import BuyCoinPage from './pages/BuyCoinPage';
import LoginPage from './pages/LoginPage';
import TransactionsPage from './pages/TransactionsPage';
import MyCoins from './pages/MyCoins';
import SellCoinsPage from './pages/SellCoinsPage';
import { useEffect } from 'react';

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/signup" element={<SignUpPage />}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/:userId/home" element={<UserHomePage/>}/>
      <Route path="/:userId/home/:page" element={<UserHomePage/>}/>
      <Route path="/:userId/buy/:coinId" element={<BuyCoinPage/>}/>
      <Route path="/:userId/transactions" element={<TransactionsPage/>} />
      <Route path="/:userId/sell" element={<MyCoins />} />
      <Route path="/:userId/sell/:coinId" element={<SellCoinsPage />} />
    </Routes>
  );

}

export default App;
