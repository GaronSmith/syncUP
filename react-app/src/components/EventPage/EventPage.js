import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEvent } from '../../store/event';
import './EventPage.css';

function EventPage() {
    const { eventId } = useParams();
    const dispatch = useDispatch();
    const storeEvent = useSelector(state => state.event);

    useEffect(() => {
        dispatch(getEvent(eventId));
    }, [eventId, dispatch]);

    return (
        <>
            {storeEvent && (
                <>
                    <div className='event__container'>
                        <div className='event__name'>
                            <h2>{storeEvent.name}</h2>
                        </div>
                        <div className='event__image'>
                            PICTURE DIV
                        </div>
                        <div className='event__description'>
                            DESCRIPTION DIV
                        </div>
                        <div className='event__information_container'>
                            INFORMATION DIV
                        </div>
                        <div className='event__attendees'>
                            ATTENDEES DIV
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default EventPage
