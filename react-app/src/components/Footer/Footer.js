import React from 'react'
import {Technology, GitHubLogo} from './Technology'

import './Footer.css'
import Connect from './Connect'

const garon = {
  name: 'Garon Smith',
  gitHub: 'https://github.com/GaronSmith',
  linkedIn: 'https://www.linkedin.com/in/william-garon-smith-3728234b/',
  angelList: 'https://angel.co/u/garon-smith'
}
const cb = {
  name: 'Christion Barnes',
  gitHub: 'https://github.com/cabarnes2020',
  linkedIn: 'https://www.linkedin.com/in/christionbarnes/',
  angelList: '#'
}
const gui = {
  name: 'Guilherme Pace',
  gitHub: 'https://github.com/guipace',
  linkedIn: 'https://www.linkedin.com/in/guilhermepace/',
  angelList: 'https://angel.co/u/guilherme-pace'
}

const clint = {
  name: 'Clinton Hill',
  gitHub: 'https://github.com/clintonhill',
  linkedIn: 'https://www.linkedin.com/in/clinton-hill-4438a0205/',
  angelList: 'https://angel.co/u/clinton-hill'
}

function Footer() {
  return (
    <footer>
      <div className='footer__container'>
        <div className='footer__contributors'>
          <Connect person={cb}/>
          <div className='connect__spacer' />
          <Connect person={clint}/>
          <div className='connect__spacer' />
          <Connect person={garon}/>
          <div className='connect__spacer' />
          <Connect person={gui}/>
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
