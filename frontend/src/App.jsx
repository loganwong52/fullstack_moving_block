import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage'
import ScoresPage from './pages/ScoresPage'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/game' element={<GamePage />} />
          <Route path='/highscores' element={<ScoresPage />} />

        </Routes>
      </Router>

    </div>
  )
}

export default App