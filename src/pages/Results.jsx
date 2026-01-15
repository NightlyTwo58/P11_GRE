import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

function Results({ score, setScore, questionBank, setQuestionBank }) {
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

    const enrichedQuestions = questions.map((q, i) => ({
      id: crypto.randomUUID(),
      type: passage ? 'reading' : 'vocab',
      passage: passage || null,
      prompt: q.prompt,
      choices: q.choices,
      correctAnswers: q.correctAnswers,
      userAnswers: answers[i] || [],
      explanations: q.explanations || {},
      timestamp: Date.now()
    }))
    setQuestionBank(prev => [...prev, ...enrichedQuestions])

    navigate('/')
  }

  // On-demand GPT explanation
  async function fetchExplanation(question, selectedChoice) {
    setLoading(true)
    setCurrentExplanation('')

    const explanation = `Explanation for choice "${selectedChoice}" of question "${question.prompt}":\nLorem ipsum...`

    // update the local questions array immediately
    const index = questions.indexOf(question)
    if (index !== -1) {
      questions[index].explanations = {
        ...(questions[index].explanations || {}),
        [selectedChoice]: explanation
      }
    }

    setCurrentExplanation(explanation)
    setLoading(false)
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
