const API_BASE = import.meta.env.VITE_API_URL

/* CONEXION RESERVAS CON EL BACKEND */

const API_URL = `${API_BASE}/appointments`


export const createAppointment = async (appointmentData, token) => {

    const res = await fetch (API_URL + '/dashboard', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify ({
            date: appointmentData.date,
            time: appointmentData.time,
            service: appointmentData.service
        })

    })

    return res.json()

}


export const getMyAppointments = async (token) => {

    const res = await fetch (API_URL + '/my-appointments', {

        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }

    })

    /*return res.json()*/

    if (!res.ok) {
        throw new Error('Error al obtener los turnos')
    }

    const data = await res.json()
    return Array.isArray(data) ? data : []

}


export const cancelAppointment = async (id, token) => {

    const res = await fetch (`${API_URL}/${id}/cancel`, {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }

    })

    return res.json()

}
