
import {Pagination} from 'react-bootstrap'

import React from 'react'

const Paginate = ({totalPages, setPage, page}) => { // компонент пагинации который через пропсы получает переменные из хука usePagination
    let paginationItems = []; // массив айтемов пагинации
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push( // исходя из переменных хука, заполняем массив айтемов с нужными атрибутами
            <Pagination.Item onClick={() => setPage(number)} key={number} active={number === page}>
                {number}
            </Pagination.Item>,
        );
    }  
  return (
    // возвращаем компонент пагинации внутри которого содержится массив айтемов (кнопки указателей страниц)
    <Pagination>
        {paginationItems}
    </Pagination>
  )
}

export default Paginate