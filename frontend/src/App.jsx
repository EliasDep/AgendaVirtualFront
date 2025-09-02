import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import MyAppointments from './pages/MyAppointments.jsx'


export default function App() {

  return (

    <Router>

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        
      </Routes>

    </Router>
    
  )
}
