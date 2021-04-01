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
          <h4>Developers</h4>
          <div className='footer__inner-container'>
            <Connect person={cb}/>
            <div className='connect__spacer' />
            <Connect person={clint}/>
            <div className='connect__spacer' />
            <Connect person={garon}/>
            <div className='connect__spacer' />
            <Connect person={gui}/>
          </div>
        </div>
        <div className='footer__technologies'>
          <h4>Technologies Used</h4>
          <div className='footer__inner-container'>
            <Technology img='https://soarview.s3.amazonaws.com/logo-react.png' url='https://reactjs.org/'/>
            <Technology img='https://soarview.s3.amazonaws.com/logo-redux.png' url='https://redux.js.org/'/>
            <Technology img='https://soarview.s3.amazonaws.com/logo-nodejs.png' url='https://nodejs.org/'/>
            <Technology img='https://soarview.s3.amazonaws.com/logo-javascript.png' url='https://developer.mozilla.org/en-US/docs/Web/JavaScript'/>
            <Technology img='https://soarview.s3.amazonaws.com/logo-html5.png' url='https://developer.mozilla.org/en-US/docs/Web/HTML'/>
            <Technology img='https://soarview.s3.amazonaws.com/logo-css3.png' url='https://developer.mozilla.org/en-US/docs/Web/CSS'/>
            <Technology img='https://soarview.s3.amazonaws.com/logo-python.png' url='https://www.python.org/'/>
            <Technology img='https://soarview.s3.amazonaws.com/logo-postgresql.png' url='https://www.postgresql.org/'/>
            <Technology img='https://soarview.s3.amazonaws.com/logo-flask.png' url='https://palletsprojects.com/p/flask/'/>
            <Technology img='https://flask-sqlalchemy.palletsprojects.com/en/2.x/_static/flask-sqlalchemy-logo.png' url='https://www.sqlalchemy.org/'/>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
