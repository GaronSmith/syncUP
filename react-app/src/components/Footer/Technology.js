import React from 'react'

export function Technology({img, url}) {
  return (
    <a href={url}>
    <div className='footer__tech-container'>
      <div className='footer__tech-image' style={{backgroundImage:`url(${img})`}}/>
    </div></a>
  )
}

export function GitHubLogo({name, url}) {
  return (
    <a href={url}><div className='footer__gh-container'>
      <div className='footer__gh-image' style={{backgroundImage:`url(https://logos-download.com/wp-content/uploads/2016/09/GitHub_logo.png)`}}/>
      <div className='footer__gh-name'>{name}</div>
    </div></a>
  )
}
