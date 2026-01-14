import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

function Results({ score, setScore }) {
  const { state } = useLocation()
  const navigate = useNavigate()

  const { passage, questions, answers } = state
  const [marked, setMarked] = useState({})

  function mark(index, isCorrect) {
    setMarked({
      ...marked,
      [index]: isCorrect
    })
  }

  function finalize() {
    let correct = 0
    let incorrect = 0

    Object.values(marked).forEach(v => {
      if (v) correct++
      else incorrect++
    })

    setScore({
      correct: score.correct + correct,
      incorrect: score.incorrect + incorrect
    })

    navigate('/')
  }

  const allMarked = Object.keys(marked).length === questions.length

  return (
    <div className="page">
      <Link to="/">
        <button>Menu</button>
      </Link>

      <h2>Passage</h2>
      <p>{passage}</p>

      <h2>Your Answers</h2>

      {questions.map((q, index) => (
        <div key={index} className="result-question">
          <h4>Question {index + 1}</h4>
          <p>{q.prompt}</p>
          <p>
            <strong>Selected:</strong> {answers[index].join(', ')}
          </p>

          <button onClick={() => mark(index, true)}>Correct</button>
          <button onClick={() => mark(index, false)}>Incorrect</button>
        </div>
      ))}

      <button onClick={finalize} disabled={!allMarked}>
        Save Results
      </button>
    </div>
  )
}

export default Results
