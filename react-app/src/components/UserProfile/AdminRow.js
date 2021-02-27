import React from 'react'

export default function AdminRow({user}) {
  return (
    <div className='admin-row__container'>
      <div className='admin-row__label'>
        {user.email}
      </div>
      <div className='admin-row__controls'>
        <div><button>Approve</button></div>
        <div><button>Deny</button></div>
      </div>
    </div>
  )
}
