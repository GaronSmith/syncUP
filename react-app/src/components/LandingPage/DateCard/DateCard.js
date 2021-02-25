import React from 'react'
import EventsCard from '../EventsCard'

import './DateCard.css'

const DateCard = ({events, date}) => {

    return (
        <div className='date__container'>
            <h2 className='date__title'>{date}</h2>
            {events && events.map( event => {
                return <EventsCard key={event.id} event={event} />
            })}
        </div>

    )
}

export default DateCard