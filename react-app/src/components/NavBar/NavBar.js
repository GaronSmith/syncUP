import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import "./NavBar.css"
const NavBar = ({ setAuthenticated, authenticated }) => {
  return (
    <nav>
      <div className='navbar__container'>
        
          <div className= 'navbar__container-left'>
            <NavLink className='navbar__link' to="/" exact={true} activeClassName="active">
              Home
            </NavLink>
          </div>
           <div className= 'navbar__container-right'>
            {!authenticated && <> <NavLink className='navbar__link' to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
            <NavLink className='navbar__link' to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink></>}

          {authenticated && <LogoutButton setAuthenticated={setAuthenticated} />}
          </div>
      </div>
      
    </nav>
  );
}

export default NavBar;