import React from 'react';
import ProfileBox from './ProfileBox'
import './UserProfile.css'

const demoUser = {
  first_name: "Demo-Lition",
  last_name: "Dave",
  email: "demodave@hopscotch.io",
  location: "Sacremento, CA",
  img_url: "https://demo.wpjobster.com/wp-content/uploads/2015/05/demo.jpg"
}

function UserProfile() {

  return (
    <div className='profile'>
      <div className='profile_box flex'>
        <div className='profile_user--left'>
          <h2>User Profile</h2>
          <p>First Name <ProfileBox content={demoUser.first_name}/></p>
          <p>Last Name <ProfileBox content={demoUser.last_name}/></p>
          <p>Email Address <ProfileBox content={demoUser.email}/></p>
          <p>Location <ProfileBox content={demoUser.location}/></p>
          <p>Profile Picture <ProfileBox content={demoUser.img_url} userFile={true}/></p>
          <p>Password <ProfileBox content={'*************'}/></p>
        </div>
        <div className='profile_user--right'>
          <div className='profile_picture' style={{ backgroundImage: `url(${demoUser.img_url})`}}/>
        </div>
      </div>

      <div className='profile_box'>
        <h2>Groups</h2>
          <h3>--Events</h3>
      </div>

      <div className='profile_box'>
        <h2>Moderation Panel</h2>
      </div>

      <div className='profile_box'>
        <h2>Administration Panel</h2>
      </div>

    </div>
  )
}

export default UserProfile
