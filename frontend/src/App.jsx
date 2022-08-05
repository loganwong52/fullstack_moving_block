import { useEffect, useState } from 'react'
import './App.css'

function App() {
  // GRID DIMENSIONS
  const ROWMAX = 7
  const COLMAX = 15

  // PLAYER'S START COORDINATES
  const [playerRow, setPlayerRow] = useState(ROWMAX - 1)
  const [playerCol, setPlayerCol] = useState(7)


  // ENEMY 1'S COORDS
  // min = 0
  // max = 2 inclusive
  const [enemy1Row, setEnemy1Row] = useState(Math.floor(Math.random() * 2))
  const [enemy1Col, setEnemy1Col] = useState(Math.floor(Math.random() * (COLMAX - 1)))


  // prevent the arrow & space keys from scrolling the page!!!
  window.addEventListener("keydown", function (e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
  }, false);

  //detecting arrow key presses, or spaces (case 32)
  function keypress(e) {
    switch (e.keyCode) {
      case 32:
        console.log("space pressed!")
        break;
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

  // Listens for key presses whenever playerRow/playerCol 
  // are updated, then immediately deletes it. 
  // This prevents infinite loop of console.logs (somehow)
  useEffect(() => {
    document.addEventListener('keydown', keypress)
    return () => document.removeEventListener("keydown", keypress);
  }, [playerRow, playerCol])



  // Every X ms, enemy 1 moves down 1 row
  useEffect(() => {

    const timer = setInterval(() => {
      setEnemy1Row(prevEnemy1Row => prevEnemy1Row + 1)
      console.log("I've moved down!")

      return () => {
        clearInterval(timer)
      }

    }, 1000)

  }, [])


  // If enemy is at the bottom, reset it's location to a random position
  useEffect(() => {
    console.log("enemy1Row: ", enemy1Row)
    console.log("enemy1Col: ", enemy1Col)

    if (enemy1Row === ROWMAX) {
      console.log("STOP!!!")
      setEnemy1Row(Math.floor(Math.random() * 2))
      setEnemy1Col(Math.floor(Math.random() * (COLMAX - 1)))
      console.log("Enemy 1 has reset!")
    }

  }, [enemy1Row])


  // style for player's red square
  const boxStyle = {
    backgroundColor: 'firebrick',
    color: 'orange'
  }

  // style for enemy 1's black square
  const enemy1Style = {
    backgroundColor: 'navy',
    color: 'red'
  }

  // CODE FOR POPULATING THE GRID
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
        } else if (i == enemy1Row && j == enemy1Col) {
          grid[grid.length - 1].push(
            <div className='box' style={enemy1Style}>
              {`${i}, ${j}`}
            </div >
          )
        }
        else {
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

  // The actual App
  return (
    <div className="App">
      <h1>ROW: {playerRow} | COL: {playerCol}</h1>

      {renderGrid()}

    </div>
  )
}

export default App