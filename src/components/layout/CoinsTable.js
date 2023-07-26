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
import { setIsLoading } from '../../redux/reducers/globalSlice';

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
    // const newUrl = changeCurrentTabAndNavigateTo(`/buy/${coin.uuid}`, { replace: true })
    dispatch(setCurrentCoin(coin));
    navigate(`/${userId}/buy/${coin.uuid}`);
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
      dispatch(setIsLoading(true));
      getCoinStats().then((stats) => {
        dispatch(setCoinStats(stats));
      })
      .then(() => {
        getListOfCoins(currentPage).then((coins) => {
          setCoins(coins);
          dispatch(setIsLoading(false));
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
      <PaginationComponent
        currentPage={currentPage}
        stats={stats}
        updatePage={updatePage}
      />
    </Container>
  );
};

export default CoinsTable;
