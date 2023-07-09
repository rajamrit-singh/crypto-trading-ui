import { useEffect, useState } from 'react'
import UserNavbar from '../components/layout/UserNavbar'
import { getListOfCoins } from '../services/coinService'
import { useDispatch } from 'react-redux'
import { setCoins } from '../redux/reducers/coinSlice'
import CoinsTable from '../components/layout/CoinsTable'

const UserHomePage = () => {
    const [coins, setCoinsAvailable] = useState([])
    const dispatch = useDispatch();
    // const getCoins = async () => {
    //     const coins = await getListOfCoins();
    //     dispatch(setCoins(coins));
    //     console.log(coins);
    // }

    useEffect(() => {
        console.log('here');
        getListOfCoins().then((coins) => {
            dispatch(setCoins(coins));
            setCoinsAvailable(coins);
            console.log(coins);
        });
    }, []);

    return (
        <>
            <UserNavbar />
            <CoinsTable coins={coins}/>
        </>
    )
}

export default UserHomePage