// Generar rango de fechas
const getDatesRange = (startDate, endDate) => {

    const dates = []
    let current = new Date (startDate)

    while (current <= endDate) {

        const day = current.getDay()

        if (day !== 0 && day !== 6) {

            dates.push (new Date (current))
        }

        current.setDate (current.getDate() + 1)
    }

    return dates
}


export const generateServices = () => {

    const serviciosNombres = ["Corte de Pelo", "Manicure", "Pedicure", "Masajes", "Tintura"]
    const tomorrow = new Date()

    tomorrow.setDate (tomorrow.getDate() + 1)

    const endDate = new Date ("2025-12-30")
    const dates = getDatesRange (tomorrow, endDate)

    const allTurnos = ["09:00","10:00","11:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"]

    const servicios = {}

    serviciosNombres.forEach (servicio => {
        servicios[servicio] = []
    })

    dates.forEach (date => {

        const dateStr = date.toISOString().split("T")[0]

        const turnosHoy = Math.floor (Math.random() * 12) + 1
        const shuffledTimes = [...allTurnos].sort (() => Math.random() - 0.5)

        for (let i = 0; i < turnosHoy; i++) {

            const servicio = serviciosNombres[Math.floor(Math.random() * serviciosNombres.length)]
            const time = shuffledTimes[i % shuffledTimes.length];

            servicios[servicio].push ({ date: dateStr, time })
        }

    })

    return servicios
}
