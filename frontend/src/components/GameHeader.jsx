import { Link } from 'react-router-dom'

function GameHeader({ youLost, points, playerCol }) {

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
                        <h1>COL: {playerCol} | POINTS: {points}</h1>
                    </div>
            }
        </div>
    )
}

export default GameHeader
