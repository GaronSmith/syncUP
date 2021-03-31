import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faAngellist } from '@fortawesome/free-brands-svg-icons'

export default function Connect({person}) {
  return (
    <div className="connect__container">
      <div className="connect__top">
        {person.name}
      </div>
      <div className="connect__bottom">
        <a href={person.gitHub}><FontAwesomeIcon icon={faGithub} size='lg'className="connect__button"/></a>
        <a href={person.linkedIn}><FontAwesomeIcon icon={faLinkedin} size='lg'className="connect__button"/></a>
        <a href={person.angelList}><FontAwesomeIcon icon={faAngellist} size='lg'className="connect__button"/></a>
        </div>
    </div>
  )
}
