import { useState } from "react";

// кастомный хук пагинации
const usePagination = ({ contentPerPage, count }) => { //через аргументы получаем кол-во контента на страницу и общее кол-во позиций
  const [page, setPage] = useState(1);//текущая страница
  const pageCount = Math.ceil(count / contentPerPage); // расчет кол-ва страниц
  const lastContentIndex = page * contentPerPage; // индекс последней позиции на странице
  const firstContentIndex = lastContentIndex - contentPerPage; // индекс первой позиции на странице
  

  const setPageOfData = (num) => {
    if (num > pageCount) { // нельзя превысить кол-во страниц
      setPage(pageCount);
    } else if (num < 1) { // при пролистывании назад ставим первую страницу
      setPage(1);
    } else {
      setPage(num); // устанавливаем текущую страницу
    }
  };

  return { // возвращаем нужные переменные
    totalPages: pageCount,
    firstContentIndex,
    setPage: setPageOfData,
    lastContentIndex,
    page,
  };
};


export default usePagination;