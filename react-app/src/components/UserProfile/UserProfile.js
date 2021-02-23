import React from 'react';
import ProfileBox from './ProfileBox'

const demoUser = {
  first_name: "Demo-Lition",
  last_name: "Dave",
  email: "demodave@hopscotch.io",
  location: "Sacremento, CA",
  img_url: "https://demo.wpjobster.com/wp-content/uploads/2015/05/demo.jpg"
}

function UserProfile() {

  return (
    <div>
      <img src={demoUser.img_url}/>
      <h2>User Profile</h2>
        <p>First Name <ProfileBox content={demoUser.first_name}/></p>
        <p>Last Name <ProfileBox content={demoUser.last_name}/></p>
        <p>Email Address <ProfileBox content={demoUser.email}/></p>
        <p>Location <ProfileBox content={demoUser.location}/></p>
        <p>Profile Picture <ProfileBox content={demoUser.img_url}/></p>
        <p>Password <ProfileBox content={'*************'}/></p>

      <h2>Groups</h2>

      <h2>Moderation Panel</h2>

      <h2>Administration Panel</h2>

    </div>
  )
}

export default UserProfile
