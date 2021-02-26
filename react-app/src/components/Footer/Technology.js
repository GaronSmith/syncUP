import React from 'react'

function Technology({img}) {
  return (
    <div className='footer__tech-container'>
      <div className='footer__tech-image' style={{backgroundImage:`url(${img})`}}/>
    </div>
  )
}

export default Technology
