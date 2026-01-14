import { useLocation, useNavigate, Link } from 'react-router-dom'

function Results({ score, setScore }) {
  const { state } = useLocation()
  const navigate = useNavigate()

  const { questions, answers } = state

  function isCorrect(user, correct) {
    if (!user) return false
    if (user.length !== correct.length) return false
    return user.every(a => correct.includes(a))
  }

  function finalize() {
    let correctCount = 0
    let incorrectCount = 0

    questions.forEach((q, i) => {
      if (isCorrect(answers[i], q.correctAnswers)) {
        correctCount++
      } else {
        incorrectCount++
      }
    })

    setScore({
      correct: score.correct + correctCount,
      incorrect: score.incorrect + incorrectCount
    })

    navigate('/')
  }

  return (
    <div className="page">
      <Link to="/"><button>Menu</button></Link>

      <h2>Results</h2>

      {questions.map((q, i) => (
        <div key={i}>
          <p><strong>Question {i + 1}</strong></p>
          <p>Your answer: {(answers[i] || []).join(', ')}</p>
          <p>Correct answer: {q.correctAnswers.join(', ')}</p>
        </div>
      ))}

      <button onClick={finalize}>Confirm & Save Score</button>
    </div>
  )
}

export default Results
