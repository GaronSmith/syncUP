import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt, faCalendarAlt, faUsers } from '@fortawesome/free-solid-svg-icons'
import { getEvent, joinEvent, deleteEvent } from '../../store/event';
import AttendeeCard from './AttendeeCard';
import GroupCard from '../UserProfile/GroupCard'
import './EventPage.css';

function EventPage() {
    const { eventId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const storeEvent = useSelector(state => state.event);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getEvent(eventId));
    }, [eventId, dispatch]);

    let userInEvent = false;
    if (storeEvent && user) {
        for (let i = 0; i < storeEvent.attendees.length; i++) {
            if (storeEvent.attendees[i].email === user.email) {
                userInEvent = true;
            }
        }
    }

    let userInGroup = false;
    if (storeEvent && user && user.groups) {
        for (let i = 0; i < user.groups.length; i++) {
            if (user.groups[i] === storeEvent.group_id) {
                userInGroup = true;
            }
        }
    }

    const attendEvent = async (e) => {
        if (userInGroup) {
            dispatch(joinEvent(user.id, storeEvent.id))
        } else {
            alert('Please join this group before registering for the event')
        }
    };

    const leaveEvent = async (e) => {
        dispatch(joinEvent(user.id, storeEvent.id));
    };

    const onEventDelete = () => {
        dispatch(deleteEvent(storeEvent.id));
        setTimeout(() => {
            history.push('/');
        }, 1000);
    };

    return (
        <>
            {storeEvent && (
                <>
                    <div className='eventPage__container'>
                        <div className='event__name'>
                            <h2>{storeEvent.name}</h2>
                        </div>
                        {user && storeEvent.owner.id !== user.id && userInEvent &&
                            <button className='event__button' onClick={leaveEvent}>Leave</button>
                        }
                        {!userInEvent &&
                            <button className='event__button' onClick={attendEvent}>Attend</button>
                        }
                        {user && storeEvent.owner.id === user.id &&
                            <button className='event__button' onClick={onEventDelete}>Delete Event</button>
                        }
                        {storeEvent.image_url && (
                            <div className='event__image'>
                                <img src={storeEvent.image_url} alt='event'></img>
                            </div>
                        )}
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
                                <Link to={`/groups/${storeEvent.group.id}`}>
                                    <GroupCard group={storeEvent.group}/>
                                </Link>
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
