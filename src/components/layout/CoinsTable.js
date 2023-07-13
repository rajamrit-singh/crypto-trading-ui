import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import './CoinsTable.css';
import { useNavigate } from 'react-router-dom';
import { changeCurrentTabAndNavigateTo } from '../../utils/navigationUtils';

const CoinsTable = ({ coins }) => {
  const navigate = useNavigate();
  const handleRowClick = (coins) => {
    console.log('Clicked:', coins);
  };

  const handleBuyCoin = (coin) => {
    console.log(coin);
    const newUrl = changeCurrentTabAndNavigateTo(`/buy/${coin.uuid}`)
    navigate(newUrl);
  }

  return (
    <Container>
    <Table className="coins-table" striped={true} hover={true}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {coins?.map((coin) => (
          <tr className='coins-row' key={coin.uuid} onClick={() => handleRowClick(coin)}>
            <td>{coin.name}<img src={coin.iconUrl} alt={coin.name} className="coin-icon" /></td>
            <td>{`$${Number(coin.price).toFixed(2)}`}</td>
            <td>
              <Button variant="primary" onClick={handleBuyCoin.bind(this, coin)}>Buy</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </Container>
  );
};

export default CoinsTable;
