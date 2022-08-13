import { useEffect, useState } from 'react'
import axios from 'axios'


function Grid({ playerRow, playerCol, ROWMAX, COLMAX, enemy1Row, enemy1Col, bulletRow, bulletCol }) {
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