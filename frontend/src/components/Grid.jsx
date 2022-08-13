import { useEffect, useState } from 'react'
import axios from 'axios'


function Grid({ playerRow, playerCol, setPlayerCol, setBulletFired,
    ROWMAX, COLMAX, enemy1Row, enemy1Col, bulletRow, bulletCol }) {
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