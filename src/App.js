import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Table, Row, Col, Stack, Button} from 'react-bootstrap';
import usePagination from './usePagination';
import Paginate from './components/Paginate';
import FilterForm from './components/FilterForm';
import TableRow from './components/TableRow';

import './App.css'

const App = () => {
    const [data, setData] = useState([]); //данные с сервера
    const [filteredData, setFilteredData] = useState([]); //отфильтрованные и отсортированные данные с сервера
    const [inputValue, setInputValue] = useState(''); // стэйт инпута ввода
    const [filterColumnValue, setFilterColumnValue] = useState(''); // стэйт одного из значений фильтрации
    const [filterConditionValue, setFilterConditionValue] = useState(''); // стэйт одного из значений фильтрации
    
    useEffect(() => { // получаем данные только при рендере приложения
        axios.get('http://localhost:3001/data')
            .then(res => {
                setData(res.data);
                setFilteredData(res.data)
            })
    }, []);

    const {
        firstContentIndex,
        lastContentIndex,
        setPage,
        page,
        totalPages,
    } = usePagination({contentPerPage: 3, count: data.length}); // настраиваем хук пагинации и получаем нужные переменные

    

    const handleSubmit = (event) => { // функция сабмита формы для фильтрации
        event.preventDefault(); // убираем обновление страницы
        setPage(1) // устанавливаем первую страницу после применения фильтра
        filter(filterColumnValue, filterConditionValue, inputValue) // запускаем функцию фильтрации
        setInputValue(''); // очищаем форму
        setFilterColumnValue('');
        setFilterConditionValue('')
    };

    
    const filter = (columnName, condition, value) => { // функция фильтрации которая получает название колонки фильтрации, условие и значение фильтрации
        // фильтрация работает только на текущей странице
        function filterByCondition(item, itemKey, condition, value) { // функция подфильтрации для чистоты кода
            // eslint-disable-next-line default-case
            switch(condition) {
                case 'Равно':
                    return String(item[itemKey]).toLowerCase() === String(value) // преобразуем числа в строки, а строки в нижний регистр чтобы избежать багов
                case 'Содержит':
                    return String(item[itemKey]).toLowerCase().includes(String(value)) // преобразуем числа в строки чтобы использовать метод includes
                // eslint-disable-next-line no-fallthrough
                case 'Больше':
                    return item[itemKey] > value // кейсы Больше и Меньше работают только с колонками Количество и Расстояние 
                case 'Меньше':
                    return item[itemKey] < value
            }
        }
        const filteredSortedData = filteredData.slice(firstContentIndex, lastContentIndex).filter((item) => { // старт фильтра
            // eslint-disable-next-line default-case
            switch(columnName) { // сначала проверяем название колонки и в зависимости от этого запускаем функция подфильтрации с разными аргументами
                case 'Название':
                    return filterByCondition(item, 'name', condition, value);
                case 'Количество':
                    return filterByCondition(item, 'amount', condition, value);
                case 'Расстояние':
                    return filterByCondition(item, 'distance', condition, value);
            }
        });
        setFilteredData(filteredSortedData) // обновляем стэйт отфильтрованными данными
    }

    
    // для сортировки данных нужно нажать на название колонки
    const sortColumn = (key) => { // функция сортировки
        let sortedData = filteredData.slice() // копируем массив основных данных

        sortedData.sort((a, b) => ( // сортировка
            a[key] > b[key] ? 1 : -1
        ))
        setPage(1) // возвращаемся на первую страницу при применении сортировки
        return setFilteredData(sortedData) // обновляем стэйт

    }


  return ( // используется CSS библиотека react-bootstrap 
    <div style={{width: '1000px', margin: '0 auto', paddingTop: '100px'}}>
        <Row>
            <Col>
                <Stack style={{minHeight: '300px'}}>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Дата</th> 
                                <th onClick={() => sortColumn('name')}>Название</th>
                                <th onClick={() => sortColumn('amount')}>Количество</th>
                                <th onClick={() => sortColumn('distance')}>Расстояние</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData && filteredData.slice(firstContentIndex, lastContentIndex).map((item, i) => ( // проверяем наличие данных и рендерим строки с данными, обрезая при этом массив по страницам
                                <TableRow 
                                    key={item.name} 
                                    i={i + 1} 
                                    date={item.date}
                                    name={item.name} 
                                    amount={item.amount} 
                                    distance={item.distance} 
                                />
                            ))}
                        </tbody>
                    </Table>
                </Stack>

                <Stack style={{alignItems: 'center'}}>
                    <Paginate page={page} setPage={setPage} totalPages={totalPages} />
                </Stack>
            </Col>
            <Col>
                <Stack gap={3}>
                    <FilterForm 
                        handleSubmit={handleSubmit}
                        filterColumnValue={filterColumnValue}
                        filterConditionValue={filterConditionValue}
                        setFilterColumnValue={setFilterColumnValue}
                        setFilterConditionValue={setFilterConditionValue}
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                    />
                    <Button style={{width: '108px'}} onClick={() => setFilteredData(data)} type='button'> 
                    {/* мы сохранили первоначальные данные с сервера в стэйте для кнопки сброса фильтров и сортировки */}
                            Сбросить
                    </Button>
                </Stack>
            </Col>
        </Row>
    </div>
  )
}


export default App