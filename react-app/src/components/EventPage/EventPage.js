import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt, faCalendarAlt, faUsers } from '@fortawesome/free-solid-svg-icons'
import { getEvent } from '../../store/event';
import AttendeeCard from './AttendeeCard';
import GroupCard from '../UserProfile/GroupCard'
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
                            <img src={storeEvent.image_url} alt='event'></img>
                        </div>
                        <div className='event__description'>
                            <h3>Description</h3>
                            <p>{storeEvent.details}</p>
                        </div>
                        <div className='event__information_container'>
                            <h3>Details</h3>
                            <p><FontAwesomeIcon className='search__icon' icon={faCalendarAlt}/> {storeEvent.date.split(' ').slice(0,4).join(' ')}</p>
                            <p><FontAwesomeIcon className='search__icon' icon={faMapMarkedAlt}/> {storeEvent.location} </p>
                            {storeEvent.rsvps >= storeEvent.capacity ?
                                <p><FontAwesomeIcon className='search__icon' icon={faMapMarkedAlt}/> No spots left!</p> :
                                <p><FontAwesomeIcon className='search__icon' icon={faUsers}/> {storeEvent.capacity - storeEvent.rsvps} of {storeEvent.capacity} spots left</p>}
                            <div>
                                <h4>Organizer: </h4>
                                <div className='event__organizer_card'>

                                        <div>
                                            <Link to={`/users/${storeEvent.owner.id}`}><img src={storeEvent.owner.image_url} alt='organizer avatar'></img></Link>
                                        </div>
                                        <div>
                                            <Link to={`/users/${storeEvent.owner.id}`}>{storeEvent.owner.first_name} {storeEvent.owner.last_name}</Link>
                                        </div>

                                </div>
                            </div>
                            <div>
                                <h4>Group:</h4>
                                <GroupCard group={storeEvent.group}/>
                            </div>
                        </div>
                        <div className='event__attendees_container'>
                            <h3>Attendees</h3>
                            <div className='event__attendees'>
                                {storeEvent.attendees.map(attendee => (
                                    <Link key={attendee.id} to={`/users/${attendee.id}`}>
                                        <AttendeeCard user={attendee}/>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default EventPage
