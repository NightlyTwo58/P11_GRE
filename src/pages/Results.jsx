import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

function Results({ score, setScore }) {
  const { state } = useLocation()
  const navigate = useNavigate()

  const { passage, questions, answers } = state

  const [currentExplanation, setCurrentExplanation] = useState('')
  const [loading, setLoading] = useState(false)

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

  // On-demand GPT explanation
  async function fetchExplanation(question, selectedChoice) {
    setLoading(true)
    setCurrentExplanation('') // Clear previous explanation

    // You would call your backend endpoint here that interacts with OpenAI
    // Example payload:
    /*
    const response = await fetch('/api/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passage, question, selectedChoice })
    })
    const data = await response.json()
    setCurrentExplanation(data.explanation)
    */

    // Placeholder for now
    setTimeout(() => {
      setCurrentExplanation(
        `Explanation for choice "${selectedChoice}" of question "${question.prompt}":\nLorem ipsum...`
      )
      setLoading(false)
    }, 500)
  }

  return (
    <div className="page">
      <Link to="/"><button>Menu</button></Link>
      <h2>Results</h2>

      <div className="split-container">
          <div className="left-panel">
              {questions.map((q, i) => (
                <div key={i}>
                  <p><strong>Question {i + 1}</strong></p>
                  <p>Your answer: {(answers[i] || []).join(', ')}</p>
                  <p>Correct answer: {q.correctAnswers.join(', ')}</p>
                </div>
              ))}
              <button onClick={finalize}>Confirm & Save Score</button>
          </div>
          <div className="right-panel">
            {questions.map((q, i) => (
              <div key={i}>
                {(answers[i] || []).map(choiceId => (
                  <button
                    key={choiceId}
                    onClick={() => fetchExplanation(q, choiceId)}
                    disabled={loading}
                    style={{ marginRight: '4px', marginBottom: '4px' }}
                  >
                    Explain "{choiceId}"
                  </button>
                ))}
              </div>
            ))}
            <h3>Explanation</h3>
            {loading ? <p>Loading explanation...</p> : <p>{currentExplanation}</p>}
          </div>
      </div>
    </div>
  )
}

export default Results
