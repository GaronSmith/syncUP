import React from 'react'
import { Link } from 'react-router-dom'
import "./EventsCard.css"

const EventsCard = ({event}) => {
    return (
        <div className="events-card__container">
            <div className="events-card__left">
                <img className='events__image' src={event.image_url}/>
            </div>
            <div className="events-card__middle">
                <Link className='event-card__group' to={`/groups/${event.group_id}`}>{event.group_name}</Link>
                <Link className='event-card__title' to={`/event/${event.id}`}>{event.name}</Link>
                <h5 className= 'event-card__details'>{event.details}</h5>
            </div>
            <div className="events-card__right">
                <h5 className='event-card__capacity'>Spots taken: {event.rsvps}/{event.capacity}</h5>
            </div>
        </div>
    )
}

export default EventsCard