import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Practice() {
  const navigate = useNavigate()

  // GPT-generated content
  const [passage, setPassage] = useState('')
  const [questions, setQuestions] = useState([])

  // UI state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)

  async function generateFromGPT() {
    setLoading(true)

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content: `
You are a GRE verbal reasoning test generator.

You must output ONLY valid JSON.
No explanations.
No markdown.
No commentary.

The JSON format MUST be:

{
  "passage": "string",
  "questions": [
    {
      "prompt": "string",
      "choices": [
        { "id": "A", "text": "string" },
        { "id": "B", "text": "string" },
        { "id": "C", "text": "string" },
        { "id": "D", "text": "string" },
        { "id": "E", "text": "string" }
      ],
      "correctAnswers": ["A", "C"]
    }
  ]
}

Rules:
- Exactly 3 questions
- Some questions MUST have multiple correct answers
- Passage should be realistic GRE-level reading comprehension
`
          },
          {
            role: 'user',
            content: 'Generate a complete GRE verbal reasoning passage with 3 questions.'
          }
        ]
      })
    })

    const data = await response.json()
    const parsed = JSON.parse(data.choices[0].message.content)

    setPassage(parsed.passage)
    setQuestions(parsed.questions)
    setAnswers({})
    setCurrentIndex(0)
    setLoading(false)
  }

  function toggleAnswer(choiceId) {
    const current = answers[currentIndex] || []

    if (current.includes(choiceId)) {
      setAnswers({
        ...answers,
        [currentIndex]: current.filter(c => c !== choiceId)
      })
    } else {
      setAnswers({
        ...answers,
        [currentIndex]: [...current, choiceId]
      })
    }
  }

  function submitAll() {
    navigate('/results', {
      state: {
        passage,
        questions,
        answers
      }
    })
  }

  const currentQuestion = questions[currentIndex]

  return (
    <div className="page">
      <Link to="/"><button>Menu</button></Link>

      <button onClick={generateFromGPT} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Practice Set'}
      </button>

      {passage && (
        <div className="split-container">
          <div className="left-panel">
            <h3>Passage</h3>
            <p>{passage}</p>
          </div>

          <div className="right-panel">
            <h3>Question {currentIndex + 1} of 3</h3>
            <p>{currentQuestion.prompt}</p>

            {currentQuestion.choices.map(choice => (
              <label key={choice.id} className="choice">
                <input
                  type="checkbox"
                  checked={(answers[currentIndex] || []).includes(choice.id)}
                  onChange={() => toggleAnswer(choice.id)}
                />
                <strong>{choice.id}.</strong> {choice.text}
              </label>
            ))}

            <div className="nav-buttons">
              <button
                onClick={() => setCurrentIndex(i => i - 1)}
                disabled={currentIndex === 0}
              >
                ←
              </button>

              {currentIndex < 2 ? (
                <button
                  onClick={() => setCurrentIndex(i => i + 1)}
                  disabled={!answers[currentIndex]?.length}
                >
                  →
                </button>
              ) : (
                <button
                  onClick={submitAll}
                  disabled={!answers[currentIndex]?.length}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Practice
