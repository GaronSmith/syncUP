import React, { useState } from 'react';

function userFileButton() {
  return (
  <>
    <span> </span>
    <input type='file'/>
  </>
  )
}

function ProfileBox({content, userFile}) {
  let [buttonText, setButtonText] = useState('Edit')
  let [value, setValue] = useState(content)
  let [formDisabled, setFormDisabled] = useState(true)

  const buttonClick = () => {
    if(formDisabled) {
      setFormDisabled(false)
      setButtonText('Confirm')
    } else {
      setFormDisabled(true)
      setButtonText('Edit')
    }
  }

  return (
    <>
      <input type='text' value={value} disabled={formDisabled} onChange={e => setValue(e.target.value)}/>
      <span> </span>
      <input type='button' value={buttonText} onClick={buttonClick}/>
      {userFile && userFileButton()}
    </>
  )
}

export default ProfileBox
