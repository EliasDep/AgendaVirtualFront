import { useState, useContext } from 'react'
import { loginUser } from '../services/authService.js'
import { AuthContext } from '../context/authContext.jsx'
import { useNavigate } from 'react-router-dom'
import './auth.css'


export default function Login() {

    const [form, setForm] = useState ({ email: '', password: '' })
    const { login: loginContext } = useContext (AuthContext)
    const navigate = useNavigate()


    const handleChange = (e) => {

        const { name, value } = e.target
        setForm ({ ...form, [name]: value })
    }


    const handleSubmit = async (e) => {

        e.preventDefault()

        const data = await loginUser (form)

        if (data.token) {

            loginContext (data)
            navigate ('/dashboard')

        } else {

            alert (data.message || 'Error al iniciar sesion')

        }
    }


    return (

        <div className="auth-container">

            <div className="auth-left">

                <form className='auth-form' onSubmit={handleSubmit}>

                    <h2>Iniciar sesión</h2>

                    <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                    <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />

                    <button type="submit">Ingresar</button>
                    <p>¿No tenés cuenta? <a href="/register">Registrate</a></p>

                    <hr className="divider" />

                    <p className="login-info">
                        Nuestra plataforma permite reservar turnos fácilmente para tus servicios favoritos:
                        cortes de pelo, manicure, pedicure, masajes y tintura. ¡Entra y empieza a reservar!
                    </p>

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
