import {Form, Button} from 'react-bootstrap'

const FilterForm = ({handleSubmit, filterColumnValue, filterConditionValue, setFilterColumnValue, setFilterConditionValue, inputValue, setInputValue}) => { // форма фильтрации
    const filterColumn = ['-', 'Название', 'Количество', 'Расстояние']; // два массива для рендера options селекта
    const filterCondition = ['-', 'Равно', 'Содержит', 'Больше', 'Меньше'];

    //используем компоненты bootstrap для визуальной составляющей
  return (
    <Form onSubmit={handleSubmit}> 
        <Form.Group className='mb-3'>
            <Form.Label>Выбор колонки</Form.Label>
            {/* селект внутри которого рендерятся options, все поля ввода формы делаем контролируемыми через атрибуты value и события onChange */}
            {/* валидация селектов на уровне браузера */}
            <Form.Select value={filterColumnValue} onChange={(e) => setFilterColumnValue(e.target.value)} required> 
                {filterColumn.map((option, i) => (
                    <option key={i}>{option}</option>
                ))}
            </Form.Select>
        </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Label>Выбор условия</Form.Label>
            <Form.Select value={filterConditionValue} onChange={(e) => setFilterConditionValue(e.target.value)} required>
                {/* если колонка для фильтрации Название, то опшины Больше и Меньше в условиях не рендерятся */}
                {filterColumnValue === 'Название' ? ['-', 'Равно', 'Содержит'].map((option, i) => (
                    <option key={i}>{option}</option>
                )) 
                    : 
                filterCondition.map((option, i) => (
                    <option key={i}>{option}</option>
                ))}
            </Form.Select>
        </Form.Group>
        <Form.Group className='mb-3'>
            <Form.Label>Значение для фильтрации</Form.Label>
            {/* валидация инпута через регулярное выражение, вводить можно только кириллицу/латиницу и цифры */}
            <Form.Control onChange={(e) => setInputValue(e.target.value.replace(/[^а-яА-ЯёЁa-zA-Z0-9]/ig, ""))} value={inputValue} required type="text" placeholder="Ключевое слово" />
        </Form.Group>
        {/* сабмит формы */}
        <Button type='submit'>
            Применить
        </Button>
    </Form>
  )
}

export default FilterForm