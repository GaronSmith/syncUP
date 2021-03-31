import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import "./EventsCard.css"

const EventsCard = ({event}) => {
    const history = useHistory();
    return (
        <div className="events-card__container" onClick={() =>history.push(`/groups/${event.group_id}`)}>
            <div className="events-card__left">
                <img className='events__image' src={event.image_url} alt='tobad'/>
            </div>
            <div className="events-card__middle">
                <Link className='event-card__group' onClick={(e) => e.stopPropagation()} to={`/groups/${event.group_id}`}>{event.group_name}</Link>
                <Link className='event-card__title' onClick={(e) => e.stopPropagation()} to={`/event/${event.id}`}>{event.name}</Link>
                <h5 className= 'event-card__details'>{event.details}</h5>
            </div>
            <div className="events-card__right">
                <h5 className='event-card__capacity'>Spots taken: {event.rsvps}/{event.capacity}</h5>
            </div>
        </div>
    )
}

export default EventsCard
