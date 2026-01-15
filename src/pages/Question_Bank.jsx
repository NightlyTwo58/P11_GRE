import { useState } from 'react'
import { Link } from 'react-router-dom'

function QuestionBank({ questionBank }) {
  const [selectedIndex, setSelectedIndex] = useState(null)

  function isCorrect(q) {
    if (!q.userAnswers) return false
    if (q.userAnswers.length !== q.correctAnswers.length) return false
    return q.userAnswers.every(a => q.correctAnswers.includes(a))
  }

  function exportQuestionBank() {
    const dataStr = JSON.stringify(questionBank, null, 2) // pretty-print JSON
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'questionBank.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="page">
      <h2>Question Bank</h2>

      <div className="split-container">
        <div className="left-panel" style={{ overflowY: 'auto', maxHeight: '80vh' }}>
          {questionBank.map((q, index) => (
            <button
              key={q.id}
              onClick={() => setSelectedIndex(index)}
              style={{
                display: 'block',
                marginBottom: '4px',
                backgroundColor: selectedIndex === index
                  ? '#ccc'
                  : isCorrect(q)
                  ? 'lightgreen'
                  : 'salmon'
              }}
            >
              Question {index + 1} ({q.type})
            </button>
          ))}
        </div>

        <div className="right-panel">
          {selectedIndex !== null && (() => {
            const q = questionBank[selectedIndex]
            return (
              <div>
                {q.passage && <p><em>{q.passage}</em></p>}
                <p><strong>Question:</strong> {q.prompt}</p>
                {q.choices.map(choice => (
                  <p key={choice.id}>
                    <strong>{choice.id}.</strong> {choice.text}
                  </p>
                ))}
                <p><strong>Your answer:</strong> {(q.userAnswers || []).join(', ') || '—'}</p>
                <p><strong>Correct answer:</strong> {q.correctAnswers.join(', ')}</p>
                {q.explanations && Object.keys(q.explanations).length > 0 && (
                  <div>
                    <strong>Explanations:</strong>
                    {Object.entries(q.explanations).map(([choiceId, explanation]) => (
                      <p key={choiceId}><em>{choiceId}:</em> {explanation}</p>
                    ))}
                  </div>
                )}
              </div>
            )
          })()}
        </div>
      </div>

      <Link to="/">
        <button>Main Menu</button>
      </Link>

      <button
        onClick={exportQuestionBank}
        disabled={questionBank.length === 0} // disable if array is empty
      >
        Export Question Bank
      </button>

    </div>
  )
}

export default QuestionBank
