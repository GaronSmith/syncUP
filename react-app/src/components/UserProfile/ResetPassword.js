import React, { useState } from 'react'
import { Modal } from '../../context/modal'

function ResetPasswordModal({showModal, setShowModal}) {

  return (
          showModal && (
              <Modal onClose={() => setShowModal(false)}>
                  <ResetPassword showModal={showModal} setShowModal={setShowModal}/>
              </Modal>
          )
  )
}
//TODO: Implement Reset Password
function ResetPassword({showModal, setShowModal}) {
  return (
    <div className='reset-password-field'>
      <div className='password-errors'>This feature does not currently work.</div>
      <div className='password_field'><label>Old Password</label><input type='password'/></div>
      <div className='password_field'><label>New Password</label> <input type='password'/></div>
      <div className='password_field'><label>Repeat New Password</label> <input type='password'/></div>
      <input id='reset-password-button' type='Button' value='Submit' onClick={()=>setShowModal(false)}/>
    </div>
  )
}

export default ResetPasswordModal
