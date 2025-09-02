import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext.jsx'
import { getMyAppointments, cancelAppointment } from '../services/appointmentService.js'
import './myAppointments.css'


export default function MyAppointments() {

    const { user } = useContext (AuthContext)
    const [appointments, setAppointments] = useState ([])


    const fetchAppointments = async () => {

        const data = await getMyAppointments (user.token)
        setAppointments (data)
    }

    useEffect (() => {
        fetchAppointments()
    }, [])

    const handleCancel = async (id) => {

        await cancelAppointment (id, user.token)
        setAppointments(prev => prev.filter (turno => turno._id !== id))
    }


    const formatDate = (dateString) => {

        const [year, month, day] = dateString.split('-')
        const date = new Date (year, month - 1, day)

        return date.toLocaleDateString ('es-ES', {

            weekday: 'long',
            day: 'numeric',
            month: 'long',
        })
    }


    return (

        <div className="my-appointments">

            <div className="my-appointments-header">

                <h2>Mis Turnos</h2>

                <Link to='/dashboard' className='dashboard-btn'>
                    Horarios
                </Link>

            </div>

            {appointments.filter (turno => turno.status ==='reserved').lenght === 0 ? (
                <p>No tenés turnos reservados</p>
            ) : (

                <ul>

                    {appointments
                        .filter (turno => turno.status ==='reserved')
                        .map ((turno) => (
                        
                        <li key={turno._id}>

                            <div className="my-appointments-info">
                                <p><b>Fecha:</b> {formatDate(turno.date)}</p>
                                <p><b>Hora:</b> {turno.time}</p>
                                <p><b>Servicio:</b> {turno.service}</p>
                            </div>
                            {turno.status === "reserved" && (
                                <button onClick={() => handleCancel(turno._id)}>Cancelar</button>
                            )}

                        </li>
                    ))}

                </ul>
            )}

        </div>

    )
}
