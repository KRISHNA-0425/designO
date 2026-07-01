import React from 'react'
import Playground from './pages/Playground'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import AuthPortal from './pages/AuthPortal'
import { useAuthStore } from './store/useAuthStore'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'

const App = () => {

  // const { user } = useAuthStore()

  return (
    <>
      <Toaster />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path="/auth" element={<AuthPortal />} />
        <Route path='/playground' element={<Playground />} />
      </Routes>
    </>
  )
}

export default App