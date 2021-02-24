import React, { useState } from 'react'
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
                    <h1>TESTING EVENT PAGE</h1>
                </>
            )}
        </>
    )
}

export default EventPage
