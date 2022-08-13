import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function GameFooter({ youLost, points }) {

    let navigate = useNavigate();

    // Get username from user input, send POST request to backend
    // to create a user with name and points.
    // Then navigate to the ScoresPage
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
            // console.log('response from saveScore:', response)

            //go to score page
            navigate('/highscores')

        }).catch((error) => {
            console.log("There was an error while saving the score!", error)

        })
    }


    return (
        <div>
            {
                youLost
                    ?
                    <div>
                        <h1>Save your score!</h1>
                        <hr />

                        <form onSubmit={handleSaveScore} >
                            <label>
                                Name:
                                <input id="name-input" type="text" name="name" />
                            </label>
                            <br />
                            <label>Points: {points}</label>
                            <br />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                    : ''
            }
        </div>
    )
}

export default GameFooter