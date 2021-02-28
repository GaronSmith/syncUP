import React from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import "./EventCard.css"

const EventCard = () => {
    const sessionUser = useSelector(state => state.session.user)
    const group = useSelector(state => state.group.group)

    return (
        sessionUser &&
        <>
           {
               group.events &&
               group.events.sort((a, b) => new Date(a.date) - new Date(b.date)).map( event => {
                    return (
                        <Link to={`/event/${event.id}`} key={event.name}>
                            <div className='event__container' id={event.name}>
                                <div className='event__pic'>
                                    <img src={event.image_url} alt='event'></img>
                                </div>

                                <div className='event__info'>
                                    <h3>{event.name}</h3>
                                    <p>{event.location} </p>
                                    <p>{event.details}</p>
                                    <p>Spots left: {event.capacity - event.rsvps}</p>
                                </div>

                                <div className='event__time'>
                                    <div className='time__div'>
                                        <h2>{event.date.split(' ').slice(0, 4).join(' ')}</h2>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })
           }
        </>
    )
}

export default EventCard;
