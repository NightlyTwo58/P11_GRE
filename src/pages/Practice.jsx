import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'

const PLACEHOLDER_QUESTION = {
  prompt: 'Sample GRE-style question?',
  choices: [
    { id: 'A', text: 'Option A' },
    { id: 'B', text: 'Option B' },
    { id: 'C', text: 'Option C' },
    { id: 'D', text: 'Option D' },
    { id: 'E', text: 'Option E' }
  ],
  correctAnswers: ['A']
}

// const PLACEHOLDER_DATA = {
//   passage:
//     'Researchers have long debated whether cognitive ability is primarily shaped by genetic inheritance or environmental influence. While early studies emphasized hereditary factors, more recent work suggests that socioeconomic conditions, education quality, and early childhood experiences play a substantial role in shaping intellectual development.',

//   questions: [
//     {
//       prompt:
//         'The passage primarily argues that cognitive ability is influenced by which of the following?',
//       choices: [
//         { id: 'A', text: 'Genetic inheritance alone' },
//         { id: 'B', text: 'Environmental factors alone' },
//         { id: 'C', text: 'A combination of genetic and environmental factors' },
//         { id: 'D', text: 'Random variation unrelated to upbringing' },
//         { id: 'E', text: 'Formal education as the sole determinant' }
//       ],
//       correctAnswers: ['C']
//     },
//     {
//       prompt:
//         'Which of the following would most strengthen the passage’s argument?',
//       choices: [
//         { id: 'A', text: 'Evidence that intelligence tests are unreliable' },
//         { id: 'B', text: 'A study showing identical twins raised apart differ in IQ' },
//         { id: 'C', text: 'Historical accounts of educational reform' },
//         { id: 'D', text: 'Criticism of early genetic research methods' },
//         { id: 'E', text: 'Data showing IQ scores remain constant over time' }
//       ],
//       correctAnswers: ['B']
//     },
//     {
//       prompt:
//         'The author would most likely agree with which of the following statements?',
//       choices: [
//         { id: 'A', text: 'Genetics fully determine intellectual potential' },
//         { id: 'B', text: 'Environmental factors have no measurable impact' },
//         { id: 'C', text: 'Early childhood experiences can influence cognitive outcomes' },
//         { id: 'D', text: 'Education quality is irrelevant to intelligence' },
//         { id: 'E', text: 'Cognitive ability cannot be studied empirically' }
//       ],
//       correctAnswers: ['C']
//     }
//   ]
// }

function generatePlaceholder(num) {
  return Array.from({ length: num }, () => ({ ...PLACEHOLDER_QUESTION }))
}

function Practice() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const numQuestions = state?.numQuestions || 3

  // GPT-generated content
  const [passage, setPassage] = useState('')
  const [questions, setQuestions] = useState([])

  // UI state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)

  async function generateFromGPT() {
    setLoading(true)

//     const response = await fetch('https://api.openai.com/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
//       },
//       body: JSON.stringify({
//         model: 'gpt-4.1-mini',
//         temperature: 0.7,
//         messages: [
//           {
//             role: 'system',
//             content: `
// You are a GRE verbal reasoning test generator.

// You must output ONLY valid JSON.
// No explanations.
// No markdown.
// No commentary.

// The JSON format MUST be:

// {
//   "passage": "string",
//   "questions": [
//     {
//       "prompt": "string",
//       "choices": [
//         { "id": "A", "text": "string" },
//         { "id": "B", "text": "string" },
//         { "id": "C", "text": "string" },
//         { "id": "D", "text": "string" },
//         { "id": "E", "text": "string" }
//       ],
//       "correctAnswers": ["A", "C"]
//     }
//   ]
// }

// Rules:
// - Exactly ${numQuestions} questions
// - Some questions MUST have multiple correct answers
// - Passage should be realistic GRE-level reading comprehension
// `
//           },
//           {
//             role: 'user',
//             content: 'Generate a complete GRE verbal reasoning passage with ${numQuestions} questions.'
//           }
//         ]
//       })
//     })

//     const data = await response.json()
//     const parsed = JSON.parse(data.choices[0].message.content)

    const parsed = {
      passage: 'This is a placeholder passage for GRE practice.',
      questions: generatePlaceholder(numQuestions)
    }
    // const parsed = PLACEHOLDER_DATA

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
            <h3>Question {currentIndex + 1} of {questions.length}</h3>
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

              {currentIndex < questions.length - 1 ? (
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
