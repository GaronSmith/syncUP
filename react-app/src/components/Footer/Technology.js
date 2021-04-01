import React from 'react'

export function Technology({img, url}) {
  return (
    <a href={url}>
    <div className='footer__tech-container'>
      <div className='footer__tech-image' style={{backgroundImage:`url(${img})`}}/>
    </div></a>
  )
}
