import { useEffect, useState } from 'react'
import Grid from '../components/Grid'
import GameHeader from '../components/GameHeader'
import GameFooter from '../components/GameFooter'
import CooldownCounter from '../components/CooldownCounter'


function GamePage() {
    // GRID DIMENSIONS
    const ROWMAX = 7
    const COLMAX = 15

    // PLAYER'S START COORDINATES
    const [playerCol, setPlayerCol] = useState(7)


    // BULLET'S COORDS
    const [bulletRow, setBulletRow] = useState(ROWMAX - 1)
    const [bulletCol, setBulletCol] = useState(-1)
    const [bulletFired, setBulletFired] = useState(false)

    // POINTS
    const [points, setPoints] = useState(0)
    const [youLost, setYouLost] = useState(false)

    // When the game renders, show alert
    const [isLoaded, setIsLoaded] = useState(false)

    // Start/End Messages /////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        if (!isLoaded) {
            alert(
                `How to play:\n
            Use the LEFT and RIGHT arrow keys to move!
            Don't let the enemy reach the bottom!
            Press the space bar to shoot the bullet to kill the enemy!
            But time it correctly...
            the bullet has a 1.5 second cool down time!
            `)
        }

    }, [])

    useEffect(() => {
        if (youLost) {
            alert("Enemy 1 reached the bottom row! YOU LOSE!")
            return
        }
    }, [youLost])





    // The actual App ///////////////////////////////////////////////////////////////////////////////////
    return (
        <div className="App">
            <GameHeader
                youLost={youLost} points={points} playerCol={playerCol}
            />

            <Grid
                playerCol={playerCol}
                setPlayerCol={setPlayerCol} setBulletFired={setBulletFired}
                ROWMAX={ROWMAX} COLMAX={COLMAX}
                bulletRow={bulletRow} bulletCol={bulletCol}
                setPoints={setPoints} setYouLost={setYouLost}
            />

            <CooldownCounter youLost={youLost} ROWMAX={ROWMAX}
                bulletRow={bulletRow} playerCol={playerCol}
                setBulletRow={setBulletRow} setBulletCol={setBulletCol}
                bulletFired={bulletFired} setBulletFired={setBulletFired}
            />

            <GameFooter youLost={youLost} points={points} />
        </div>
    )
}

export default GamePage