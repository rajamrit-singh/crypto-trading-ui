import { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ currentPage, updatePage, stats }) => {
    const [pagesToShow, setPagesToShow] = useState([]);
    const lastPage = stats ? Math.ceil(stats?.totalCoins / 50) : 5;
    console.log(currentPage);
    useEffect(() => {
        let initial;
        let last;
            const pagesToShow = [1]
            if(currentPage <=4 ) {
                initial = 2;
                last = 5;
            } else if (currentPage >= lastPage - 3) {
                initial = lastPage - 3;
                last = lastPage;
            } else {
                initial = currentPage - 1;
                last = lastPage
            }
            for (let i = initial; i < initial + 3; i++) {
                pagesToShow.push(i);
            }
            pagesToShow.push(last);
            setPagesToShow(pagesToShow);
    }, [currentPage, lastPage]);
    return (
        <Pagination>
            {pagesToShow.map((page) => 
            <Pagination.Item
                key={page}
                active={currentPage === page}
                onClick={updatePage.bind(this, page)}
            >{page}</Pagination.Item>
            )}
        </Pagination>
    )
}

export default PaginationComponent;