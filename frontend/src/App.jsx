import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const ROWMAX = 8
  const COLMAX = 15

  const [playerRow, setPlayerRow] = useState(7)
  const [playerCol, setPlayerCol] = useState(7)

  // prevent the arrow keys from scrolling the page!!!
  window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
  }, false);

  //detecting arrow key presses
  function keypress(e) {
    switch (e.keyCode) {
      case 37:
        if (playerCol > 0) {
          console.log('left', playerCol - 1);
          setPlayerCol(playerCol - 1)

        } else {
          console.log("You can't go further left!")
        }
        break;
      case 38:
        if (playerRow > 0) {
          console.log('up', playerRow - 1);
          setPlayerRow(playerRow - 1)

        } else {
          console.log("You can't go further up!")
        }
        break;
      case 39:
        if (playerCol < COLMAX - 1) {
          console.log('right', playerCol + 1);
          setPlayerCol(playerCol + 1)

        } else {
          console.log("You can't go further right!")
        }
        break;
      case 40:
        if (playerRow < ROWMAX - 1) {
          console.log('down', playerRow + 1);
          setPlayerRow(playerRow + 1)

        } else {
          console.log("You can't go further down!")
        }
        break;
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keypress)
    return () => document.removeEventListener("keydown", keypress);
  }, [playerRow, playerCol])




  // CODE FOR FILLING UP THE GRID
  const boxStyle = {
    backgroundColor: 'FireBrick',
    color: 'white'
  }

  const renderGrid = () => {
    let grid = []

    for (let i = 0; i < ROWMAX; i++) {
      grid.push([])
      for (let j = 0; j < COLMAX; j++) {
        if (i == playerRow && j == playerCol) {
          grid[grid.length - 1].push(
            <div className='box' style={boxStyle}>
              {`${i}, ${j}`}
            </div >
          )
        } else {
          grid[grid.length - 1].push(
            <div className='box'>
              {`${i}, ${j}`}
            </div >
          )
        }
      }
    }

    return (
      <div className='grid'>
        {grid}
      </div>
    )
  }


  return (
    <div className="App">
      <h1>ROW: {playerRow} | COL: {playerCol}</h1>

      {renderGrid()}

    </div>
  )
}

export default App
