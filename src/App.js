import './App.css'
import { MainPage } from './MainPage'
import { TaskPage } from './TaskPage'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="task/:id" element={<TaskPage />}></Route>
      </Routes>
    </>
  )
}

export default App
