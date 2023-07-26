import React, { useEffect } from 'react';
import { Table, Button, Container } from 'react-bootstrap';
// import './MyCoins.css';
import { useDispatch, useSelector } from 'react-redux';
import { getListOfCoins, getUserCoins } from '../services/coinService';
import UserNavbar from '../components/layout/UserNavbar';
import { setWallet } from '../redux/reducers/walletSlice';
import { setCurrentCoin } from '../redux/reducers/currentCoinSlice';
import { useNavigate } from 'react-router-dom';
import { getUserIdFromUrl } from '../utils/navigationUtils';
import { setCoins } from '../redux/reducers/coinSlice';

const MyCoins = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const coinsData = useSelector(state => state.crypto);
    const wallet = useSelector(state => state.wallet);
    const currencyPrices = new Map();
    coinsData.forEach((coin) => {
        currencyPrices.set(coin.uuid, +coin.price);
    });
    const handleSellCoin = (coin) => {
        dispatch(setCurrentCoin(coin));
        const id = getUserIdFromUrl();
        navigate(`/${id}/sell/${coin.currency_id}`)
    };

    const refreshApiCall = async () => {
        const userWallet = await getUserCoins();
        dispatch(setWallet(userWallet));
        const uuids = userWallet.map((coin) => coin.currency_id);
        const coins = await getListOfCoins(1, uuids.length, uuids);
        dispatch(setCoins(coins));
    }

    useEffect(() => {
        console.log('inside use effect');
        console.log(coinsData);
        refreshApiCall();
    }, []);

    return (
        <>
        <UserNavbar />
        <Container className="sell-coins-container">
            <h1>Sell Coins</h1>
            <div className="table-wrapper">
                <Table className="sell-coins-table" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Replace the coinData array with your actual data */}
                        {coinsData.length >= wallet.length && wallet.map((coin) => (
                            coin.quantity > 0 && <tr key={coin.currency_id} className="coin-row">
                                <td>{coin.currency_name}</td>
                                <td>{coin.quantity}</td>
                                <td>{currencyPrices.get(coin.currency_id).toFixed(2)}</td>
                                <td>
                                    <Button variant="primary" onClick={() => handleSellCoin(coin)}>
                                        Sell
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
        </>
    );
};

export default MyCoins;
