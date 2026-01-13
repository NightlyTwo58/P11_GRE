import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Practice() {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState([])
    const navigate = useNavigate()
    const choices = [
      { id: 'A', text: 'Choice A' },
      { id: 'B', text: 'Choice B' },
      { id: 'C', text: 'Choice C' },
      { id: 'D', text: 'Choice D' },
      { id: 'E', text: 'Choice E' }
    ]


    function submitAnswer() {
        if (answer.length === 0) {
            alert("Please choose an answer(s) before submitting.")
            return
        }
        navigate('/Results', {
            state: { answer, question }
        })
    }
    return (
      <div className="page">
        <Link to="/">
          <button>Menu</button>
        </Link>

        <div className="split-container">
          <div className="left-panel">
            <h2>Text</h2>
             <textarea
              placeholder="Paste or generate a question"
              value={question}
              onChange={e => setQuestion(e.target.value)}
            />
          </div>

          <div className="right-panel">
            {choices.map(choice => (
              <label key={choice.id} className="choice">
                <input
                  type="checkbox"
                  checked={answer.includes(choice.id)}
                  onChange={() => {
                    if (answer.includes(choice.id)) {
                      setAnswer(answer.filter(a => a !== choice.id))
                    } else {
                      setAnswer([...answer, choice.id])
                    }
                  }}
                />
                <span>
                  <strong>{choice.id}.</strong> {choice.text}
                </span>
              </label>
            ))}

            <button onClick={submitAnswer} disabled={answer.length === 0}>Submit</button>
          </div>
        </div>
      </div>
    )
}

export default Practice