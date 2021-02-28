import React from 'react';
import { useHistory } from 'react-router-dom';

function GroupCard({group}) {
  const history = useHistory();
  const imgURL = group?.image_url ? group.image_url : '/img/placeholder-image.jpg';
  return (
    <div className='profile_group-card' onClick={() => history.push(`/groups/${group.id}`)}>
      <div className='profile_group-card--top'>
        <div className='profile_group-picture' style={{ backgroundImage: `url(${imgURL})`}}/>
      </div>
      <div className='profile_group-card--bottom'>
        <p id='profile_group-name'>{group.name}</p>
        <p id='profile_group-location'>{group.location}</p>
        <p id='profile_group-description'>{group.description}</p>
      </div>
    </div>
  )
}

export default GroupCard
