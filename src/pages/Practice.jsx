import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Practice() {
  const navigate = useNavigate()

  const [passage, setPassage] = useState('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})

  const choices = [
    { id: 'A', text: 'Choice A' },
    { id: 'B', text: 'Choice B' },
    { id: 'C', text: 'Choice C' },
    { id: 'D', text: 'Choice D' },
    { id: 'E', text: 'Choice E' }
  ]

  const questions = [
    { prompt: 'Question 1 prompt', choices },
    { prompt: 'Question 2 prompt', choices },
    { prompt: 'Question 3 prompt', choices }
  ]

  const currentQuestion = questions[currentQuestionIndex]
  const currentAnswer = answers[currentQuestionIndex] || []

  const allAnswered =
    Object.keys(answers).length === questions.length &&
    Object.values(answers).every(a => a.length > 0)

  function toggleAnswer(choiceId) {
    const updated = currentAnswer.includes(choiceId)
      ? currentAnswer.filter(a => a !== choiceId)
      : [...currentAnswer, choiceId]

    setAnswers({
      ...answers,
      [currentQuestionIndex]: updated
    })
  }

  function submitAll() {
    if (!allAnswered) return

    navigate('/Results', {
      state: {
        passage,
        questions,
        answers
      }
    })
  }

  return (
    <div className="page">
      <Link to="/">
        <button>Menu</button>
      </Link>

      <div className="split-container">
        <div className="left-panel">
          <h2>Passage</h2>
          <textarea
            placeholder="Paste or generate a reading passage"
            value={passage}
            onChange={e => setPassage(e.target.value)}
          />
        </div>

        <div className="right-panel">
          <h3>
            Question {currentQuestionIndex + 1} of {questions.length}
          </h3>

          <p>{currentQuestion.prompt}</p>

          {currentQuestion.choices.map(choice => (
            <label key={choice.id} className="choice">
              <input
                type="checkbox"
                checked={currentAnswer.includes(choice.id)}
                onChange={() => toggleAnswer(choice.id)}
              />
              <span>
                <strong>{choice.id}.</strong> {choice.text}
              </span>
            </label>
          ))}

          <div className="nav-buttons">
            <button
              onClick={() => setCurrentQuestionIndex(i => i - 1)}
              disabled={currentQuestionIndex === 0}
            >
              ← Previous
            </button>

            <button
              onClick={() => setCurrentQuestionIndex(i => i + 1)}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next →
            </button>
          </div>

          {currentQuestionIndex === questions.length - 1 && (
            <button onClick={submitAll} disabled={!allAnswered}>
              Submit All
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Practice
