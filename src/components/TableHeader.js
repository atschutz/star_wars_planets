export default function TableHeader({ headerData }) {

    return (
        <tr className='table-header'>
            {headerData.map((data, index) => (
                <td key={index} className='header-cell'>{data}</td>
            ))}
        </tr>
    )
}
