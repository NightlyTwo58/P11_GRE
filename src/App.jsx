import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import Home from './pages/Home'
import Practice from './pages/Practice'
import Results from './pages/Results'
import VocabPractice from './pages/Vocab_Practice'
import QuestionBank from './pages/Question_Bank'

function App() {
  const [score, setScore] = useState ({
      correct: 0,
      incorrect: 0
  })

  const [questionBank, setQuestionBank] = useState([])


  return (
    <Routes>
      <Route
        path="/"
        element={<Home score={score} />}
      />

      <Route
        path="/practice"
        element={
          <Practice
            setQuestionBank={setQuestionBank}
          />
        }
      />

      <Route
        path="/vocab_practice"
        element={
          <VocabPractice
            setQuestionBank={setQuestionBank}
          />
        }
      />

      <Route
        path="/results"
        element={
          <Results
            score={score}
            setScore={setScore}
            setQuestionBank={setQuestionBank}
          />
        }
      />

      <Route
        path="/question_bank"
        element={
          <QuestionBank
            questionBank={questionBank}
          />
        }
      />
    </Routes>
  )
}

export default App
