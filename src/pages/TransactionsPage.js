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

const TransactionsPage = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transactions);
    const user = useSelector(state => state.user);
    const coins = useSelector(state => state.crypto);
    
    const calculateProfitLoss = (transaction) => {
        const coin = coins.find((c) => c.uuid === transaction.crypto_id);
        const diff = (coin.price - transaction.crypto_cost) * transaction.quantity;
        return diff.toFixed(2);
    };

    const handleSellCoin = (coin) => {

    }

    const refreshApiCall = async () => {
        let profile;
        if (user.user_id === '') {
            profile = await getProfile();
            dispatch(setUser(profile));
        }
        if (coins.length === 0) {
            const listOfCoins = await getListOfCoins();
            dispatch(setCoins(listOfCoins));
        }
        const transactionList = await getTransactions(user.user_id || profile.user_id);
        dispatch(addTransactions(transactionList));
    }

    useEffect(() => {
        refreshApiCall();
    }, [])

    return (
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.transaction_id} className='transaction-rows'>
                                <td>{'bitcoin'}</td>
                                <td>{`${transaction.quantity} ${transaction.type === 'buy' ? '₹' : ''}`}</td>
                                <td>{Number(transaction.total_amount).toFixed(2)}</td>
                                <td>{transaction.transaction_type}</td>
                                <td>{new Date(transaction.transaction_timestamp).toLocaleDateString()}</td>
                                <td>{new Date(transaction.transaction_timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                <td>{transaction.transaction_type === 'buy' && calculateProfitLoss(transaction)}</td>
                                <td>
                                    {transaction.transaction_type === 'buy' && (
                                        <Button variant="primary" onClick={handleSellCoin.bind(this, transaction)}>Sell</Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default TransactionsPage;
