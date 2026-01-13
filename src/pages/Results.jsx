import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function Results({score, setScore}) {
    const { state } = useLocation()
    const navigate = useNavigate()

//     const correctAnswers = ['B', 'D']
//     function isCorrect(userAnswer, correctAnswers) {
//       if (userAnswer.length !== correctAnswers.length) return false
//       return userAnswer.every(a => correctAnswers.includes(a))
//     }

    function markCorrect() {
        setScore({
            correct: score.correct + 1,
            incorrect: score.incorrect
        })
        navigate('/')
    }

    function markIncorrect() {
        setScore({
            correct: score.correct,
            incorrect: score.incorrect + 1
        })
        navigate('/')
    }

    return (
        <div className="page">
            <Link to="/">
                <button>Menu</button>
            </Link>
            <h2>Your Answer</h2>
            <p>{state.answer}</p>

            <h3>GPT Feedback</h3>
            <p>(Coming next)</p>

            <h3>Was this correct?</h3>

            <button onClick={markCorrect}>Correct</button>
            <button onClick={markIncorrect}>Incorrect</button>
        </div>
    )
}

export default Results