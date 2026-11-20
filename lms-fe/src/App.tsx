import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import LoginForm from './components/loginform'
import UserDashboard from './pages/userdashboard'
import AdminDashboard from './pages/admindashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   {/* <LoginForm /> */}
   {/* <UserDashboard /> */}
   <AdminDashboard />
   </>
  )
}

export default App
