import { useEffect, useState } from 'react'
import axios from 'axios'


function Grid({ playerCol, setPlayerCol, setBulletFired,
    ROWMAX, COLMAX, bulletRow, bulletCol, setPoints, setYouLost }) {
    const [playerRow, setPlayerRow] = useState(ROWMAX - 1)
    // ENEMY 1'S COORDS
    const [enemy1Row, setEnemy1Row] = useState(Math.floor(Math.random() * 2))
    const [enemy1Col, setEnemy1Col] = useState(Math.floor(Math.random() * (COLMAX - 1)))


    // Image related stuff

    // Noun Image ID numbers
    const spaceshipID = 4504415
    const enemyID = 129022
    const laserID = 288032

    // Image src URLs state values
    const [spaceshipUrl, setSpaceshipUrl] = useState('')
    const [enemyUrl, setEnemyUrl] = useState('')
    const [laserUrl, setLaserUrl] = useState('')


    function getData(id) {
        // send request to backend to access the Noun API and get image URLs
        axios.get(`/geturls/${id}`).then((response) => {
            let url = response.data
            // console.log(url)
            if (id === spaceshipID) {
                setSpaceshipUrl(url)
            } else if (id === enemyID) {
                setEnemyUrl(url)
            } else if (id === laserID) {
                setLaserUrl(url)
            }
        })
    }

    // On mount, retreive the image URLs
    useEffect(() => {
        getData(spaceshipID)
        getData(enemyID)
        getData(laserID)
    }, [])

    // Moving the Player ////////////////////////////////////////////////////////////////////////////////////////////////

    // prevent the arrow & space keys from scrolling the page!!!
    window.addEventListener("keydown", function (e) {
        if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);

    //detecting arrow key presses, or spaces (case 32)
    // Player can ONLY move left or right
    function keypress(e) {
        switch (e.keyCode) {
            // Space bar: Fire bullet
            case 32:
                console.log("space pressed!")

                setBulletFired(true)

                break;

            // Left Arrow Key: Move left by 1 square
            case 37:
                if (playerCol > 0) {
                    // console.log('left', playerCol - 1);
                    setPlayerCol(playerCol - 1)

                } else {
                    console.log("You can't go further left!")
                }
                break;

            // Right Arrow Key: Move right by 1 square
            case 39:
                if (playerCol < COLMAX - 1) {
                    // console.log('right', playerCol + 1);
                    setPlayerCol(playerCol + 1)

                } else {
                    console.log("You can't go further right!")
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



    //  Enemy movement  /////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Every X ms, enemy 1 moves down 1 row
    useEffect(() => {
        const timer = setInterval(() => {
            setEnemy1Row(prevEnemy1Row => prevEnemy1Row + 1)
            // console.log("I've moved down!")

        }, 500)

        // this return might actually never run...
        return () => {
            clearInterval(timer)
            console.log("Enemy 1 despawned!")
        }

    }, [])

    // If enemy is at the bottom, reset it's location to a random position
    useEffect(() => {
        // console.log("enemy1Row: ", enemy1Row)
        // console.log("enemy1Col: ", enemy1Col)

        if (enemy1Row === -1) {
            // console.log("STOP!!!")
            setEnemy1Row(Math.floor(Math.random() * 2))     // randomly chooses ROW 0, 1, or 2

            //randomly chooses NEW col that's NOT the same
            let newCol = enemy1Col
            if (newCol < 7) {
                // enemy respawns on the right side (COLS 7 thru 14 inclusive)
                newCol = Math.floor(Math.random() * (COLMAX - 7) + 7)
            } else {
                // >= 6, enemy respawns on the left side (COLS 0 thru 6 inclusive)
                newCol = Math.floor(Math.random() * 6)
            }
            setEnemy1Col(newCol)
            // console.log("Enemy 1 has reset!")

        } else if (enemy1Row === ROWMAX) {
            // YOU LOSE!
            setYouLost(true)
        }

    }, [enemy1Row])


    // When bullet and enemy 1 overlap
    // it takes enemy 1.25 second to respawn
    useEffect(() => {

        // if they overlap, increment points by 1
        if (bulletRow === enemy1Row && bulletCol === enemy1Col) {
            setPoints(prevPoints => prevPoints + 1)

            // hide the enemy
            setTimeout(() => { console.log("Enemy 1 is respawning") }, 1250)
            setEnemy1Row(-1)

        }

    }, [bulletRow, enemy1Row])


    // Render the Grid ///////////////////////////////////////////////////////////////////////////////////////////////

    // style for player's red square
    const boxStyle = {
        backgroundColor: 'firebrick',
        color: 'orange'
    }

    // style for enemy 1's black square
    const enemy1Style = {
        backgroundColor: 'steelblue',
        color: 'red'
    }

    // style for the bullet
    const bulletStyle = {
        backgroundColor: 'goldenrod',
        color: 'black'
    }

    // CODE FOR POPULATING THE GRID
    const renderGrid = () => {
        let grid = []

        for (let i = 0; i < ROWMAX; i++) {
            grid.push([])
            for (let j = 0; j < COLMAX; j++) {
                if (i == playerRow && j == playerCol) {
                    // box is the player
                    grid[grid.length - 1].push(
                        <div className='box' style={boxStyle}>
                            <img className='spaceshipImg' src={spaceshipUrl} alt='ship' />

                        </div >
                    )

                } else if (i == enemy1Row && j == enemy1Col) {
                    // box is the enemy
                    grid[grid.length - 1].push(
                        <div className='box' style={enemy1Style}>
                            <img className='enemyImg' src={enemyUrl} alt='enemy' />

                        </div >
                    )

                } else if (i == bulletRow && j == bulletCol) {
                    grid[grid.length - 1].push(
                        <div className='box' style={bulletStyle}>
                            <img className='laserImg' src={laserUrl} alt='laser' />

                        </div >
                    )

                }
                else {
                    // box is empty
                    grid[grid.length - 1].push(
                        <div className='box'>
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
        <div>
            {renderGrid()}
        </div>
    )

}

export default Grid