import { useState } from 'react'
import './App.css'

function App() {

  let box = <div className='box'>
    hello
  </div>

  const renderGrid = () => {
    let grid = []

    for (let i = 0; i < 8; i++) {
      grid.push([])
      for (let j = 0; j < 15; j++) {
        grid[grid.length - 1].push(
          <div className='box'>
            {`${i}, ${j}`}
          </div>
        )
      }
      // grid.push(<br />)
    }


    return (
      <div className='grid'>
        {grid}
      </div>
    )

  }

  return (
    <div className="App">
      <h1>Welcome</h1>

      {renderGrid()}
    </div>
  )
}

export default App
