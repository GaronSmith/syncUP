import React from 'react';
import { NavLink } from 'react-router-dom';
import LoginFormModal from '../auth/LoginForm';
import SignUpFormModal from '../auth/SignUpForm';
import EventFormModal from '../EventForm';
import ProfileImage from './ProfileImage'
import "./NavBar.css"
import GroupFormModal from '../CreateGroupModal';

const NavBar = ({ setAuthenticated, authenticated }) => {
  return (
    <nav>
      <div className='navbar__container'>

          <div className= 'navbar__container-left'>
            <NavLink className='navbar__link' to="/" exact={true} activeClassName="active">
              Home
            </NavLink>
          </div>
          <div className='navbar__container-middle'>
            syncUP
          </div>
           <div className= 'navbar__container-right'>
            {!authenticated &&
              <>
                <LoginFormModal setAuthenticated={setAuthenticated} authenticate={authenticated} />
                <SignUpFormModal setAuthenticated={setAuthenticated} authenticate={authenticated} />
              </>
            }
            {authenticated &&
              <>
                <EventFormModal setAuthenticated={setAuthenticated} authenticate={authenticated} />
                <GroupFormModal setAuthenticated={setAuthenticated} authenticate={authenticated} />
                <ProfileImage setAuthenticated={setAuthenticated}/>
              </>
            }
          </div>

      </div>
    </nav>
  );
}

export default NavBar;
