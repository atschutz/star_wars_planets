
import { useState, useEffect } from 'react'
import TableHeader from './components/TableHeader'
import TableRow from './components/TableRow'
import './App.css'

function App() {
  const [planets, setPlanets] = useState([])
  const [hasError, setHasHerror] = useState(false)

  useEffect(() => {
    fetch('https://swapi.dev/api/planets/')
      .then((res) => {
        if (res.ok) { 
          setHasHerror(false)
          return res.json()
        } else { return Promise.reject('Error loading from endpoint!') }
      })
      .then((json) => {
        console.log(json.results)
        setPlanets(
          // Sort planets alphabetically by name. 
          (json.results).sort((a, b) => {
            const aLow = a.name.toLowerCase()
            const bLow = b.name.toLowerCase()
            return (aLow < bLow) ? -1 : (aLow > bLow) ? 1 : 0
          }))
      })
      .catch(() => { setHasHerror(true) })
  }, [])

  // Header names for each column.
  const headerData = [
    'Name', 
    'Climate', 
    'Residents', 
    'Terrain', 
    'Population',
    'Surface Covered by Water', 
  ]

  return (
    <div className='app'>
      {
        // If we have an error, show the error message.
        // Otherwise, show the table.
        hasError ? (
          <p className='error-message'>Error loading data!</p>
        ) : (
          planets.length > 0 ? (
            <table className='planet-table'>
              <thead>
                <TableHeader headerData={headerData} />
              </thead>
              <tbody>
                {planets.map((planetData) => (
                  <TableRow key={planetData.name} planet={planetData} />
                ))}
              </tbody>
            </table>
          ) : (
            <p className='loading-message'>Loading...</p>
          )
        )
      }
    </div>
  )
}

export default App
