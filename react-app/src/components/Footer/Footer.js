import React from 'react'
import {Technology, GitHubLogo} from './Technology'

import './Footer.css'

function Footer() {
  return (
    <footer>
      <div className='footer__container'>
        <div className='footer__contributors'>
          <GitHubLogo name='C.Barnes' url='https://github.com/cabarnes2020'/>
          <GitHubLogo name='C.Hill' url='https://github.com/clintonhill'/>
          <GitHubLogo name='G.Smith' url='https://github.com/GaronSmith'/>
          <GitHubLogo name='G.Pace' url='https://github.com/guipace'/>
        </div>
        <div className='footer__technologies'>
          <Technology img='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/220px-React-icon.svg.png' url='https://reactjs.org/'/>
          <Technology img='https://raw.githubusercontent.com/reactjs/redux/master/logo/logo.png' url='https://redux.js.org/'/>
          <Technology img='https://invenio-software.org/static/img/logo-flask.svg' url='https://flask.palletsprojects.com/en/1.1.x/'/>
          <Technology img='https://flask-sqlalchemy.palletsprojects.com/en/2.x/_static/flask-sqlalchemy-logo.png' url='https://www.sqlalchemy.org/'/>
        </div>
      </div>
    </footer>
  )
}

export default Footer
