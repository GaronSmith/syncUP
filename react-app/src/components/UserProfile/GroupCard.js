import React from 'react';

function GroupCard({group}) {
  return (
    <div className='profile_group-card'>
      <div className='profile_group-card--top'>
        <div className='profile_group-picture' style={{ backgroundImage: `url(${group.image_url})`}}/>
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
