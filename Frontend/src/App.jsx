import React from 'react'
import Playground from './pages/Playground'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import AuthPortal from './pages/AuthPortal'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path="/auth" element={<AuthPortal />} />
        <Route path='/playground' element={<Playground />} />
      </Routes>
    </>
  )
}

export default App