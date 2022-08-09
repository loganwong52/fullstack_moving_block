import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


function GamePage() {
    // GRID DIMENSIONS
    const ROWMAX = 7
    const COLMAX = 15

    // PLAYER'S START COORDINATES
    const [playerRow, setPlayerRow] = useState(ROWMAX - 1)
    const [playerCol, setPlayerCol] = useState(7)

    // ENEMY 1'S COORDS
    const [enemy1Row, setEnemy1Row] = useState(Math.floor(Math.random() * 2))
    const [enemy1Col, setEnemy1Col] = useState(Math.floor(Math.random() * (COLMAX - 1)))

    // BULLET'S COORDS
    const [bulletRow, setBulletRow] = useState(ROWMAX - 1)
    const [bulletCol, setBulletCol] = useState(-1)
    const [bulletFired, setBulletFired] = useState(false)
    const [reachedTheTop, setReachedTheTop] = useState(false)

    // Bullet Cooldown
    const [cooldownCount, setCooldownCount] = useState(1.5)

    // POINTS
    const [points, setPoints] = useState(0)
    const [youLost, setYouLost] = useState(false)
    let navigate = useNavigate();

    // When the game renders, show alert
    const [isLoaded, setIsLoaded] = useState(false)

    ///////////////////////////////////////////////////////////////////////////////////////////////////
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
        // request to backend
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
    ///////////////////////////////////////////////////////////////////////////////////////////////////

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


    // Bullet movemet ////////////////////////////////////////////////////////////////////////////////////////////////////

    // Cooldown for Bullet
    useEffect(() => {
        // if bullet has been fired, there's a cooldown time
        console.log("Has bullet been fired: ", bulletFired)
        if (bulletFired) {
            // spawn the bullet
            setBulletCol(playerCol)

            // run the cooldown timer!
            const cdCounter = setInterval(() => {
                setCooldownCount(prevCooldown => (prevCooldown - 0.01).toFixed(2))
                // console.log(cooldownCount)

            }, 10)

            // wait 1.5 seconds
            console.log("I'm gonna wait...")
            setTimeout(() => {
                console.log("Done waiting! Set fired to false.")
                setBulletFired(false)
                // once the 1.5 seconds are over, delete the cdCounter so it's not subtracting anymore!
                clearInterval(cdCounter)
            }, 1500)


            // confirm you can't spam bullets...
            const counter = setInterval(() => { console.log("I'm counting...") }, 1000)
            return () => {
                clearInterval(counter)
            }

        } else {
            console.log("I haven't fired the bullet.")
            setReachedTheTop(false)

        }
    }, [bulletFired])


    // Every X ms, bullet 1 moves up 1 row
    useEffect(() => {
        if (bulletFired && !reachedTheTop) {
            const bulletTimer = setInterval(() => {
                setBulletRow(prevBulletRow => prevBulletRow - 1)
                // console.log("Bullet moved up!")

            }, 100)
            // it takes 600 ms to get to the other side

            return () => {
                clearInterval(bulletTimer)
                // console.log("Bullet despawned!")
            }
        }

    }, [bulletFired, reachedTheTop])


    // If Bullet is at the top, reset it's location to bottom row
    useEffect(() => {
        // console.log("bulletRow: ", bulletRow)
        // console.log("bulletCol: ", bulletCol)

        if (bulletRow === -1) {
            console.log("STOP bullet!!!")
            setBulletRow(ROWMAX - 1)
            setBulletCol(-1)
            setReachedTheTop(true)
            // setBulletCol(Math.floor(Math.random() * COLMAX - 1))
            console.log("Bullet has reset!")
        }

    }, [bulletRow])

    // updating cooldown count
    useEffect(() => {
        if (cooldownCount < 1.5 && cooldownCount > 0.0) {
            console.log(cooldownCount)
        } else {
            setCooldownCount(1.50)
        }

    }, [cooldownCount])


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


    useEffect(() => {
        if (youLost) {
            alert("Enemy 1 reached the bottom row! YOU LOSE!")
            return
        }
    }, [youLost])


    // When bullet and enemy 1 overlap...   //////////////////////////////////////////////////////////////////////////
    useEffect(() => {

        // if they overlap, increment points by 1
        if (bulletRow === enemy1Row && bulletCol === enemy1Col) {
            setPoints(prevPoints => prevPoints + 1)

            // hide the enemy
            setTimeout(() => { console.log("Enemy 1 is respawning") }, 1250) // it takes enemy 1.25 second to respawn?
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

    function reloadPage() {
        window.location.reload()
    }

    const handleSaveScore = (event) => {
        event.preventDefault()

        // get username
        let name = event.target[0].value

        if (name.length === 0) {
            alert("Please enter a name!")
            return
        }

        // points is the state value 'points'

        axios.post('/saveScore', {
            name: name,
            score: points

        }).then((response) => {
            console.log('response from saveScore:', response)

            // UseNavigate to go to show score page
            navigate('/highscores')

        }).catch((error) => {
            console.log("There was an error while saving the score!", error)

        })

    }


    // The actual App
    return (
        <div className="App">
            {
                youLost
                    ?
                    <div>
                        <h1> YOU LOST! | POINTS: {points}</h1>
                        <button className="you-lost-button" onClick={reloadPage}>Replay?</button>
                        <button className="you-lost-button">
                            <Link to={'/'}>Return to Home Page</Link>
                        </button>
                    </div>

                    :
                    <div>
                        <h1>ROW: {playerRow} | COL: {playerCol} | POINTS: {points}</h1>
                        <h2>BULLET COOLDOWN: {cooldownCount}s</h2>
                        {/* Some bug for the bullet cooldown when game ends... so I'll just NOT display it when you've Lost */}
                    </div>
            }


            {renderGrid()}

            {
                youLost
                    ?
                    <div>
                        <h1>Save your score!</h1>
                        <hr />

                        {/* enter name */}
                        <form onSubmit={handleSaveScore} >
                            <label>
                                Name:
                                <input id="name-input" type="text" name="name" />
                            </label>
                            <br />
                            <label>
                                Points: {points}
                            </label>

                            <br />
                            <input type="submit" value="Submit" />
                        </form>

                    </div>
                    : ''
            }

        </div>
    )
}

export default GamePage