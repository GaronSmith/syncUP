import React from 'react'

function Technology({img, name, optionalClass}) {
  return (
    <div className='footer__tech-container'>
      <div className='footer__tech-image' style={{backgroundImage:`url(${img})`}}/>
      <span className={`footer__tech-name ${optionalClass}`}>{name}</span>
    </div>
  )
}

export default Technology
