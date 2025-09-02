import { useState, useContext } from 'react'
import { registerUser } from '../services/authService.js'
import { AuthContext } from '../context/authContext.jsx'
import { useNavigate } from 'react-router-dom'
import './auth.css'


export default function Register() {

    const [form, setForm] = useState ({ name: '', email: '', password: '' })
    const { login } = useContext (AuthContext)
    const navigate = useNavigate()


    const handleChange = (e) => {

        const { name, value } = e.target
        setForm ({ ...form, [name]: value })
    }


    const handleSubmit = async (e) => {

        e.preventDefault()

        const data = await registerUser (form)

        if (data.token) {

            login (data)
            navigate ('/')

        } else {

            alert (data.message || 'Error al registrarse')

        }
    }


    return (

        <div className="auth-container">

            <div className="auth-left">

                <form className='auth-form' onSubmit={handleSubmit}>

                    <h2>Registrarse</h2>

                    <input type="text" name="name" placeholder="Nombre" onChange={handleChange} />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                    <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />

                    <button type="submit">Registrarse</button>

                </form>

            </div>

            <div className="auth-right">

                <div className="overlay-text">
                    <h1>Glow Studio</h1>
                    <p>Organiza tus turnos de manera rápida y sencilla.</p>
                </div>

            </div>

        </div>

    )
}
