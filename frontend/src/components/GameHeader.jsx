import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


function GameHeader({ youLost, points, playerRow, playerCol, cooldownCount }) {


    // Reloads the page
    function reloadPage() {
        window.location.reload()
    }

    return (
        <div>
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
                        {/* Some bug for the bullet cooldown when game ends... 
                        so I'll just NOT display it when you've Lost */}
                    </div>
            }
        </div>
    )
}

export default GameHeader
