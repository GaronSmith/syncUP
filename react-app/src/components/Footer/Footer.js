import React from 'react'
import Technology from './Technology'

import './Footer.css'

function Footer() {
  return (
    <footer>
      <div className='footer__container'>
        <div className='footer__contributors'>
          <Technology img='https://logos-download.com/wp-content/uploads/2016/09/GitHub_logo.png' name='CB Barnes'/>
          <Technology img='https://logos-download.com/wp-content/uploads/2016/09/GitHub_logo.png' name='Clinton Hill'/>
          <Technology img='https://logos-download.com/wp-content/uploads/2016/09/GitHub_logo.png' name='Garon Smith'/>
          <Technology img='https://logos-download.com/wp-content/uploads/2016/09/GitHub_logo.png' name='Gui Pace'/>
        </div>
        <div className='footer__technologies'>
          <Technology img='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/220px-React-icon.svg.png' name='React'/>
          <Technology img='https://raw.githubusercontent.com/reactjs/redux/master/logo/logo.png' name='Redux'/>
          <Technology img='https://invenio-software.org/static/img/logo-flask.svg' name='Flask'/>
          <Technology img='https://flask-sqlalchemy.palletsprojects.com/en/2.x/_static/flask-sqlalchemy-logo.png' name='SQL Alchemy' optionalClass='smaller'/>
        </div>
      </div>
    </footer>
  )
}

export default Footer
