import React, { useEffect } from 'react';
import { Table, Button, Container, ResponsiveEmbed } from 'react-bootstrap';
import './TransactionsPage.css';
import { getTransactions } from '../services/transactionService';
import { useDispatch, useSelector } from 'react-redux';
import { addTransactions } from '../redux/reducers/transactionsSlice';
import { getProfile } from '../services/userService';
import { setUser } from '../redux/reducers/userSlice';
import { getListOfCoins } from '../services/coinService';
import { setCoins } from '../redux/reducers/coinSlice';
import UserNavbar from '../components/layout/UserNavbar';

const TransactionsPage = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transactions);
    const user = useSelector(state => state.user);
    const coins = useSelector(state => state.crypto);

    const handleSellCoin = (coin) => {

    }

    const getMyTransactions = () => {
        const myTransactions =  transactions.map((transaction) => {
            const currentCoin = coins.find((coin) => {
                return coin.uuid === transaction.crypto_id;
            });
            if(!currentCoin) {
                return null
            }
            console.log(transaction);
            const coinName = currentCoin.name;
            const profitLoss = ((currentCoin.price - transaction.crypto_cost) * transaction.quantity).toFixed(2);
            const myTransaction = {...transaction, coinName, profitLoss};
            return myTransaction;
        });
        console.log(myTransactions);
        // return my
        return myTransactions.filter(t => t !== null);
    }

    const refreshApiCall = async () => {
        let profile;
        if (user.user_id === '') {
            profile = await getProfile();
            dispatch(setUser(profile));
        }
        const transactionList = await getTransactions(user.user_id || profile.user_id);
        const uuids = transactionList.map((transaction) => {
            return transaction.crypto_id
        });
        console.log(uuids);
        if (coins.length === 0) {
            const listOfCoins = await getListOfCoins(1, 100, uuids);
            dispatch(setCoins(listOfCoins));
        }
        dispatch(addTransactions(transactionList));
    }

    useEffect(() => {
        refreshApiCall();
    }, [])

    return (
        <>
        <UserNavbar />
        <Container className="transactions-container">
            <h1>List of Transactions</h1>
            <div className="table-wrapper">
                <Table className="transactions-table" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Currency Name</th>
                            <th>Currency Quantity</th>
                            <th>Total Amount</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Profit/Loss</th>
                        </tr>
                    </thead>
                    <tbody>
                        {coins.length && getMyTransactions().map((transaction) => (
                            <tr key={transaction.transaction_id} className='transaction-rows'>
                                <td>{transaction.coinName}</td>
                                <td>{`${transaction.quantity} ${transaction.type === 'buy' ? '₹' : ''}`}</td>
                                <td>{Number(transaction.total_amount).toFixed(2)}</td>
                                <td>{transaction.transaction_type}</td>
                                <td>{new Date(transaction.transaction_timestamp).toLocaleDateString()}</td>
                                <td>{new Date(transaction.transaction_timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                <td>{transaction.transaction_type === 'buy' && transaction.profitLoss}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
        </>
    );
};

export default TransactionsPage;
