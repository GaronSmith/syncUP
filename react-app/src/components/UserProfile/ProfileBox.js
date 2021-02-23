import React, { useState } from 'react';

function ProfileBox({content}) {
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
    </>
  )
}

export default ProfileBox
