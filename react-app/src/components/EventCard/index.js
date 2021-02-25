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
                    <h3>Event name</h3>
                    <p>Host: </p>
                    <p>Event Details:</p>
                    <p>Spots remaining:</p>
                </div>

                <div className='event__time'>
                    <div className='time__div'>
                        <h2>8:00 p.m.</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventCard;