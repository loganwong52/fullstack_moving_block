import { Link } from 'react-router-dom'

function HomePage() {


    return (
        <div>
            <h1>Welcome!</h1>

            <br />
            <button>
                <h2>
                    <Link to={'/game'}>Play the game!</Link>
                </h2>
            </button>


        </div>
    )

}

export default HomePage