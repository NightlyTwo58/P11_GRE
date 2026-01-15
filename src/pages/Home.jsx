import { Link } from 'react-router-dom'
import { useState } from 'react'

function reset() {
    score.correct = 0
    score.incorrect = 0
    total = 0
}

function Home({ score, setScore }) {
  const [numQuestions, setNumQuestions] = useState(3) // default 3
  const total = score.correct + score.incorrect
  const accuracy = total === 0 ? 0 : Math.round((score.correct / total) * 100)

  function reset() {
    setScore({ correct: 0, incorrect: 0 })
  }

  return (
    <div className="page">
      <h1>Verbal Reasoning GRE Practice</h1>

      <p>
        Correct: {score.correct} <br />
        Incorrect: {score.incorrect} <br />
        Total: {total} <br />
        Accuracy: {accuracy}% <br />
      </p>

      <p>
        Number of questions:
        <input
          type="number"
          min="1"
          max="10"
          value={numQuestions}
          onChange={e => setNumQuestions(parseInt(e.target.value))}
        />
      </p>

      <Link to="/practice" state={{ numQuestions }}>
        <button>Start Reading Practice</button>
      </Link>
      <Link to="/vocab_practice" state={{ numQuestions }}>
        <button>Start Vocab Practice</button>
      </Link>

      <button onClick={reset} disabled={total === 0}>Reset</button>
    </div>
  )
}


export default Home
