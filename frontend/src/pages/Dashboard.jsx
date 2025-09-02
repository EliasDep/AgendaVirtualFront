import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Calendar from 'react-calendar'
import { AuthContext } from '../context/authContext.jsx'
import { createAppointment } from '../services/appointmentService.js'
import { generateServices } from '../context/generateServices.js'
import 'react-calendar/dist/Calendar.css'
import './dashboard.css'


const servicios = generateServices()


export default function Dashboard() {

  const [selectedDate, setSelectedDate] = useState (new Date())
  const { user } = useContext (AuthContext)
  const [message, setMessage] = useState('')


  const reservar = async (service, slot) => {

    const data = await createAppointment ({ date: slot.date, time: slot.time, service }, user.token)

    if (data._id) {

      setMessage ('Turno reservado con exito ✅')

    } else {

      setMessage ('❌ Error al reservar el turno, intente nuevamente')

    }

    setTimeout (() => setMessage(''), 3000)

  }


  const formatDate = (date) => {
    return date.toISOString().split("T")[0]
  }


  return (

    <div className='dashboard'>

      <div className="dashboard-header">

        <h2>Horarios Disponibles</h2>

        <Link to='/my-appointments' className='my-appointments-btn'>
          Mis turnos
        </Link>

      </div>

      {message && (
        <div className="feedback-message">
          {message}
        </div>
      )}

      <div className="dashboard-content">

        {/* Columna izquierda */}
        <div className="appointments">

          {Object.entries(servicios).map (([servicio, slots]) => {

            const disponibles = slots.filter (
              (slot) => slot.date === formatDate (selectedDate)
            )

            return (

              <div key={servicio} className="service-section">

                <h3>{servicio}</h3>
                <hr className="divider" />

                {disponibles.length > 0 ? (
                  <div className="cards-container">

                    {disponibles.map ((slot, idx) => (

                      <div key={idx} className="appointment-card">

                        <p>{slot.date}</p>
                        <p>{slot.time}</p>
                        <button onClick={() => reservar(servicio, slot)}>
                          Reservar
                        </button>

                      </div>

                    ))}

                  </div>
                ) : (
                  <p className="no-turnos">No hay turnos disponibles</p>
                )}

              </div>

            )

          })}
          
        </div>

        {/* Columna derecha */}
        <div className="calendar-container">

          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            locale="es-ES"
          />

        </div>

      </div>

    </div>

  )
}
