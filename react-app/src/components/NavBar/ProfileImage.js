import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import LogoutButton from '../auth/LogoutButton';

function ProfileImage({setAuthenticated}) {
  let user = useSelector(state => state.session.user) || null;
  if(!user) {
    user = {
      first_name: "Demo-Lition",
      last_name: "Dave",
      email: "demodave@hopscotch.io",
      location: "Sacremento, CA",
      image_url: "https://demo.wpjobster.com/wp-content/uploads/2015/05/demo.jpg"
    };
  }

  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      <div className='profile-image__circle' style={{backgroundImage:`url(${user.image_url})`}} onClick={openMenu}>
      </div>
      {showMenu && (
        <div className="profile-dropdown">
          <span id='profile-dropdown__user'>{user.email}</span>
          <span className='hr'/>
          <a href='/users/me'>Dashboard</a>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </div>
      )}
    </>
  )
}

export default ProfileImage
