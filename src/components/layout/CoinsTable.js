import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import './CoinsTable.css';

const coinssTable = ({ coins }) => {
  const handleRowClick = (coins) => {
    console.log('Clicked:', coins);
  };

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
              <Button variant="primary">Buy</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </Container>
  );
};

export default coinssTable;
