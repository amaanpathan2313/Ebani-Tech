import { useState } from 'react'

import './App.css'
import { Signup } from './components/Signup/Signup'
import { Route, Routes } from 'react-router-dom'
import { Login } from './components/Login/Login'
import { Dashboard } from './components/Dashboard/Dashboard'
import { Landing } from './components/LandingPage/LandingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
  
<Routes>
  
  <Route path='/' element={<Landing/>} />
  <Route path='/sign-up' element={ <Signup/>} />
  <Route path='/login' element={ <Login/>} />
  <Route path='/dashboard'  element={<Dashboard/>} />

</Routes>
     
    </>
  )
}

export default App
