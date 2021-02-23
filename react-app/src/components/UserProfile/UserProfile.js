import React from 'react';
import { useSelector } from 'react-redux';
import ProfileBox from './ProfileBox';
import './UserProfile.css';

const demoUser = {
  first_name: "Demo-Lition",
  last_name: "Dave",
  email: "demodave@hopscotch.io",
  location: "Sacremento, CA",
  image_url: "https://demo.wpjobster.com/wp-content/uploads/2015/05/demo.jpg"
};

function UserProfile() {

  let user = useSelector(state => state.session.user) || demoUser;

  return (
    <div className='profile'>
      <div className='profile_box flex'>
        <div className='profile_user--left'>
          <h2>User Profile</h2>
          <p>First Name <ProfileBox label='first_name' content={user.first_name}/></p>
          <p>Last Name <ProfileBox label='last_name' content={user.last_name}/></p>
          <p>Email Address <ProfileBox label='email' content={user.email}/></p>
          <p>Location <ProfileBox label='location' content={user.location}/></p>
          <p>Profile Picture <ProfileBox label='image_url' content={user.image_url} userFile={true}/></p>
          <p>Password <ProfileBox label='password' content={'*************'}/></p>
        </div>
        <div className='profile_user--right'>
          <div className='profile_picture' style={{ backgroundImage: `url(${user.image_url})`}}/>
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
  );
};

export default UserProfile
