import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

function ScorePage() {

    const [allUsers, setUsers] = useState([])
    const [scores, setScores] = useState([])
    const [startAt, setStartAt] = useState(0)
    const [showPrevButton, setShowPrevButton] = useState(false)
    const [showNextButton, setShowNextbutton] = useState(true)

    // helper function that fills scores array
    function populateScoresArr() {
        let elements = []
        let user = null
        let stop = startAt + 10
        if (stop > allUsers.length) {
            stop = allUsers.length
        }

        for (let i = startAt; i < stop; i++) {
            user = allUsers[i]
            elements.push(
                <h3>
                    {i + 1}. name: {user.name}
                    <br />
                    score: {user.score}
                </h3>
            )
        }
        setScores(elements)
    }


    // on Mount, render the scores
    useEffect(() => {
        axios.get('/getScores').then((response) => {
            let allUsers = response.data.data
            setUsers(allUsers)

        }).catch((error) => {
            console.log("There was an error while showing the TOP scores!", error)
        })

    }, [])


    // When allUsers is populated, get the top 10 scores
    useEffect(() => {
        if (allUsers.length > 0)
            populateScoresArr()
    }, [allUsers])


    // Handle when the previous button is clicked
    const handlePrevClick = () => {
        console.log("go back to previous 10")
        setStartAt(startAt - 10)
    }

    // Handle when the next button is clicked
    const handleNextClick = () => {
        console.log("go to next 10")
        setStartAt(startAt + 10)
    }


    // When either previous or next is clicked, 
    // update whether to render the buttons or not
    // and then change the top 10 scores that are rendered
    useEffect(() => {
        if (startAt > 0) {
            setShowPrevButton(true)
        } else {
            setShowPrevButton(false)
        }

        console.log(allUsers.length)
        if (allUsers.length > startAt + 10) {
            setShowNextbutton(true)
        } else {
            setShowNextbutton(false)
        }

        if (allUsers.length > 0)
            populateScoresArr()

    }, [allUsers, startAt])


    return (
        <div>
            <h1>HIGHSCORES:</h1>
            <hr />

            {/* Dispay top 10 scores */}
            {scores}

            {/* Button that shows the previous 10 scores */}
            {
                showPrevButton &&
                <button onClick={() => { handlePrevClick() }}>Show Previous 10</button>
            }

            <button className="goHomeBtn">
                <Link to={'/'}>Return to Home Page</Link>
            </button>

            {/* Button that shows the next 10 scores */}
            {
                showNextButton &&
                <button onClick={() => { handleNextClick() }}>Show Next 10</button>
            }
        </div >
    )
}

export default ScorePage