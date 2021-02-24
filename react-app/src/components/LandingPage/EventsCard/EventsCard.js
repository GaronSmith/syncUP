import React from 'react'
import "./EventsCard.css"

const EventsCard = ({event}) => {
    return (
        <div className="events-card__container">
            <div className="events-card__left">
                
            </div>
            <div className="events-card__middle">
                <h3 className='event-card__title'>{event.name}</h3>
            </div>
            <div className="events-card__right">

            </div>
        </div>
    )
}

export default EventsCard