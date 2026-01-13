import { Link } from 'react-router-dom'

function reset() {
    score.correct = 0
    score.incorrect = 0
    total = 0
}

function Home({ score, setScore }) {

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

      <Link to="/practice">
        <button>Start Practice</button>
      </Link>

      <button onClick={reset} disabled={total === 0}>Reset</button>
    </div>
  )
}


export default Home
