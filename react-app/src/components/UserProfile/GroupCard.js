import React from 'react';

function GroupCard({group}) {
  return (
    <div className='profile_group-card'>
      <div className='profile_group-card--top'>
        <div className='profile_group-picture' style={{ backgroundImage: `url(${group.image_url})`}}/>
      </div>
      <div className='profile_group-card--bottom'>
        <p>{group.name}</p>
        <p>{group.location}</p>
        <p>{group.description}</p>
      </div>
    </div>
  )
}

export default GroupCard
