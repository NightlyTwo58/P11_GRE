import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import Home from './pages/Home'
import Practice from './pages/Practice'
import Results from './pages/Results'
import VocabPractice from './pages/Vocab_Practice'

function App() {
    const [score, setScore] = useState ({
        correct: 0,
        incorrect: 0
    })

  return (
    <Routes>
      <Route
        path="/"
        element={<Home score={score} />}
      />
      <Route
        path="/practice"
        element={<Practice />}
      />
      <Route
        path="/vocab_practice"
        element={<VocabPractice />}
      />

      <Route
        path="/results"
        element={
          <Results
            score={score}
            setScore={setScore}
          />
        }
      />
    </Routes>
  )
}

export default App
