import React, { useState } from 'react';
import ResetPasswordModal from './ResetPassword'
import { useSelector } from 'react-redux';
import ProfileBox from './ProfileBox';
import GroupCard from './GroupCard'
import './UserProfile.css';

const demoUser = {
  first_name: "Demo-Lition",
  last_name: "Dave",
  email: "demodave@hopscotch.io",
  location: "Sacremento, CA",
  image_url: "https://demo.wpjobster.com/wp-content/uploads/2015/05/demo.jpg"
};

const demoGroup = {
  name: 'Hopscotch United',
  description: 'A group of people who really love hopping, skipping, and counting to 9.',
  location: 'Moneyweather Elementry, Sacremento CA',
  image_url: 'http://gamesweplayed.com/wp-content/uploads/2010/01/Hopscotch.jpg',
  is_private: false,
}

const demoGroup2 = {
  name: 'American Theater Troupe',
  description: "Verilly, t'was I who killed the beast.",
  location: 'Forberg University, Sacremento CA',
  image_url: 'https://mrfrade11thgradeenglish.files.wordpress.com/2014/05/hamlet-skull-sm1.jpeg',
  is_private: true,
}

function UserProfile() {

  let user = useSelector(state => state.session.user) || demoUser;
  const [showModal, setShowModal] = useState(false);
  return (
    <div className='profile'>
      <h2>User Profile</h2>
      <div className='profile_box flex'>
        <div className='profile_user--left'>
          <p>First Name <ProfileBox label='first_name' content={user.first_name}/></p>
          <p>Last Name <ProfileBox label='last_name' content={user.last_name}/></p>
          <p>Email Address <ProfileBox label='email' content={user.email}/></p>
          <p>Location <ProfileBox label='location' content={user.location}/></p>
          <p>Profile Picture <ProfileBox label='image_url' content={user.image_url} userFile={true}/></p>
          {/* TODO: Implement Change Password Button */}
          <p><input type='button' value='Change Password' onClick={()=> setShowModal(true)}/></p>
        </div>
        <div className='profile_user--right'>
          <div className='profile_picture' style={{ backgroundImage: `url(${user.image_url})`}}/>
        </div>
      </div>

      <h2>Groups</h2>
        <div className='profile_box groups'>
          <GroupCard group={demoGroup}/>
          <GroupCard group={demoGroup2}/>
          <GroupCard group={demoGroup}/>
          <GroupCard group={demoGroup2}/>
          <GroupCard group={demoGroup}/>
          <GroupCard group={demoGroup2}/>
          <GroupCard group={demoGroup}/>
          <GroupCard group={demoGroup2}/>
          <div className='spacer'/>
        </div>

      <div className='profile_box'>
        <h2>Moderation Panel</h2>
      </div>

      <div className='profile_box'>
        <h2>Administration Panel</h2>
      </div>

      <ResetPasswordModal showModal={showModal} setShowModal={setShowModal} />

    </div>
  );
};

export default UserProfile
