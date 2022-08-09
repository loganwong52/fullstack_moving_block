import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

function ScorePage() {

    const [scores, setScores] = useState([])

    // on Mount, render the scores
    useEffect(() => {
        let elements = []

        axios.get('/getScores').then((response) => {
            let allUsers = response.data.data
            // console.log('response from getScores ', allUsers)

            let user = null
            for (let i = 1; i <= allUsers.length; i++) {
                user = allUsers[i - 1]
                elements.push(
                    <h3>
                        {i}. name: {user.name}
                        <br />
                        score: {user.score}
                    </h3>
                )
            }
            setScores(elements)

        }).catch((error) => {
            console.log("There was an error while showing the TOP scores!", error)
        })

    }, [])



    return (
        <div>
            <h1>HIGHSCORES:</h1>
            <hr />

            {/* Dispay top 10 scores */}
            {scores}

            <button>
                <Link to={'/'}>Return to Home Page</Link>
            </button>

        </div>
    )
}

export default ScorePage