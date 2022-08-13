import { Link } from 'react-router-dom'

function HomePage() {

    return (
        <div>
            <h1 id="welcome-header">Welcome to:
                <br />
                Simple Space Invader Game!</h1>
            <br />

            <button id="play-game-btn">
                <h2>
                    <Link to={'/game'}>Play the game!</Link>
                </h2>
            </button>

        </div>
    )

}

export default HomePage