import './style/app.scss'
import Home from './pages/Home'
import Login from './pages/Login'
import { useState, useEffect } from 'react'

function App() {

  let [logged , setLogged] = useState(false)

  useEffect(() => {
    if(sessionStorage.getItem('user_id') !== null){
      setLogged(true)
    }
}, [])

  

  let handleLogged = () => {
    setLogged(true)
  }

  let handleLogout = () => {
    setLogged(false)
  }

  return (
    <> 
      {logged ? <Home logout={handleLogout} /> : <Login logged={handleLogged} />}
    </>
  )
}

export default App
