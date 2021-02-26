import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import groupReducer, { getOne } from '../../store/groups'
import { NavLink, useParams } from 'react-router-dom';
import "./EventCard.css"
import searchEvents from '../../store/events'

const EventCard = () => {
    const sessionUser = useSelector(state => state.session.user)
    const group = useSelector(state => state.group.group)
    const dispatch = useDispatch()


    return (
        sessionUser &&
        <>
           {
               group.events &&
               group.events.sort((a, b) => new Date(a.date) - new Date(b.date)).map( event => {
                    return (
                        <div className='event__container' id={event.name}>
                            <div className='event__pic'>
                                <img src={event.image_url}></img>
                            </div>

                            <div className='event__info'>
                                <h3>{event.name}</h3>
                                <p>{event.location} </p>
                                <p>{event.details}</p>
                                <p>Spots left: {event.capacity - event.rsvps}</p>
                            </div>

                            <div className='event__time'>
                                <div className='time__div'>
                                    <h2>{event.date}</h2>
                                </div>
                            </div>
                        </div>
                    )
                })
           } 
        </>
    )
}

export default EventCard;