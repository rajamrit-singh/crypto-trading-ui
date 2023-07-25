import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Pagination } from 'react-bootstrap';
import './CoinsTable.css';
import { useNavigate, useParams } from 'react-router-dom';
import { changeCurrentTabAndNavigateTo } from '../../utils/navigationUtils';
import { setCurrentCoin } from '../../redux/reducers/currentCoinSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCoinStats, getListOfCoins } from '../../services/coinService';
import { setCoinStats } from '../../redux/reducers/coinStatsSlice';
import PaginationComponent from '../common/Pagination';

const CoinsTable = () => {
  const { userId, page } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [coins, setCoins] = useState([]);
  const ITEMS_PER_PAGE = 50;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stats = useSelector(state => state.coinStats);
  const handleRowClick = (coins) => {
  };

  const handleBuyCoin = (coin) => {
    const newUrl = changeCurrentTabAndNavigateTo(`/buy/${coin.uuid}`, { replace: true })
    dispatch(setCurrentCoin(coin));
    navigate(newUrl);
  }

  const updatePage = (page) => {
    setCurrentPage(page);
    navigate(`/${userId}/home/${page}`); // Update the URL with the new page number
  }

  if (page !== undefined && currentPage !== +page) {
    updatePage(+page);
  }


  useEffect(() => {

    const updateStatsAndCoins = () => {
      getCoinStats().then((stats) => {
        dispatch(setCoinStats(stats));
      })
      .then(() => {
        getListOfCoins(currentPage).then((coins) => {
          setCoins(coins);
        });
      });
    }
    updateStatsAndCoins();
  }, [currentPage]);

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
      {/* <Pagination>
        {Array.from({ length: Math.ceil(stats?.totalCoins / ITEMS_PER_PAGE) }).map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === ITEMS_PER_PAGE}
            onClick={() => updateCoins(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination> */}
      <PaginationComponent
        currentPage={currentPage}
        stats={stats}
        updatePage={updatePage}
      />
    </Container>
  );
};

export default CoinsTable;
