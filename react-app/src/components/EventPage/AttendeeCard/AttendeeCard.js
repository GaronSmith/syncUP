import React from 'react'
import './AttendeeCard.css';

function AttendeeCard({user}) {

  return (
    <div className='attendeeCard__container'>
      <div className='attendeeCard__image'>
        <img src={user.image_url} alt='attendee avatar'></img>
      </div>
      <div className='attendeeCard__name'>
        {user.first_name} {user.last_name[0].toUpperCase()}.
      </div>
    </div>
  )
}

export default AttendeeCard
