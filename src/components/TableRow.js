export default function TableRow({ planet }) {
    
    // Use 4(pi)r^2 to discover surface area of the planet. Then multiply that by percentage of surface water * 0.01.
    // But first, check to make sure it doesn't equal unknown. 
    const surfAreaWater = planet.surface_water === 'unknown' ? 'unknown' : Math.round((4 * Math.PI * Math.pow(planet.diameter/2, 2)) * (planet.surface_water * 0.01))

    // Simple function to handle replacing "unknown" result with "?"
    const ifUnknown = (value) => value === 'unknown' ? '?' : value

    // Adds spaces to a number to denote thousands. 
    // I initially looped through each char in the string backwards, and spliced in a space every 3 chars,
    // but then I found this neat regular expression on stackoverflow that does the job much more efficiently. 
    const addSpaces = (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    
    return (
        <tr>
          <td key='name' className='clickable-table-cell' onClick={() => window.open(planet.url)}>{ifUnknown(planet.name)}</td> 
          <td key='climate' className='table-cell'>{ifUnknown(planet.climate)}</td> 
          <td key='residents' className='table-cell'>{addSpaces(ifUnknown((planet.residents).length))}</td> 
          <td key='terrain' className='table-cell'>{ifUnknown(planet.terrain)}</td> 
          <td key='population' className='table-cell'>{addSpaces(ifUnknown(planet.population))}</td> 
          <td key='water' className='table-cell'>{addSpaces(ifUnknown(surfAreaWater))} km²</td>
        </tr>
    )
}
