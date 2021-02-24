import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getOne } from '../../store/groups'
import { NavLink, useParams } from 'react-router-dom';
import "./EventCard.css"

const EventCard = () => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()



    return (
        sessionUser &&
        <>
            <div className='event__container'>
                <div className='event__pic'>
                    <h1>Event Image</h1>
                </div>
                
                <div className='event__info'>
                    <h2>Event name</h2>
                    <h3>Host: </h3>
                    <h3>Event Details:</h3>
                    <h3>Spots remaining:</h3>
                </div>

                <div className='event__time'>
                    <h2>8:00 p.m.</h2>
                </div>
            </div>
        </>
    )
}

export default EventCard;