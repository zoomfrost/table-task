

const TableRow = ({i, date, name, amount, distance}) => { // компонент строки таблицы
    return (
        <tr>
            <td>{i}</td>
            <td>{date}</td>
            <td>{name}</td>
            <td>{amount}</td>
            <td>{distance}</td>
        </tr>
    )
}

export default TableRow