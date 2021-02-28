import React, { useEffect, useState } from 'react';
import ResetPasswordModal from './ResetPassword'
import { useParams } from  'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/user'
import ProfileBox from './ProfileBox';
import GroupCard from './GroupCard'
import AdminRow from './AdminRow'
import './UserProfile.css';

const demoUsers = [{email: "bob@hopscotch.io",},{email: "demodave@hopscotch.io",}];

function UserProfile() {

  const { id } = useParams();
  const dispatch = useDispatch();
  let sessionUser = useSelector(state => state.session.user)
  let user = useSelector(state => state.user);
  let groups = user.groups;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if(id === 'me') {
      dispatch(getUser(sessionUser.id));
    }
    else
      dispatch(getUser(id));
  },[dispatch, sessionUser.id, id, user.id])

  const imgURL = user?.image_url ? user.image_url : '/img/userDefault.png';

  return ( user && (
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
          {id === 'me' && <p><input type='button' value='Change Password' onClick={()=> setShowModal(true)}/></p> }
        </div>
        <div className='profile_user--right'>
          <div className='profile_picture' style={{ backgroundImage: `url(${imgURL})`}}/>
        </div>
      </div>

      <h2>My Groups</h2>
        <div className='profile_box groups'>
          {groups?.map(group =>
            <GroupCard group={group}/>
          )}
          <div className='spacer'/>
        </div>
      {id === 'me' && (
        <>
        <h2>Moderation Panel</h2>
          <div className='profile_box groups'>
            {groups?.filter(group => group.owner.id === user.id).map( group => <GroupCard group={group} />)}
            <div className='spacer'/>
        </div>

        <h2>Administration Panel</h2>
        <div className='profile_box'>
            {demoUsers?.map(user => <AdminRow user={user}/>)}
        </div>
        </>
      )}
      <ResetPasswordModal showModal={showModal} setShowModal={setShowModal} />

    </div> )
  );
};

export default UserProfile
