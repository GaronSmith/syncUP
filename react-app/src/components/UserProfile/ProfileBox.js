import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function userFileButton() {
  return (
  <>
    <span> </span>
    <input type='file'/>
  </>
  );
};

function ProfileBox({label, content, userFile}) {
  let [buttonText, setButtonText] = useState('Edit');
  let [value, setValue] = useState(content);
  let [formDisabled, setFormDisabled] = useState(true);
  let user = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const initialValue = content;

  const buttonClick = () => {
    //The editor is not active.
    if(formDisabled) {
      setFormDisabled(false);
      setButtonText('Confirm');
    //The editor is active. Clicking this will dispatch a thunk to actually change the database.
    } else {
      setFormDisabled(true);
      setButtonText('Edit');
      if(content === initialValue) return;

      dispatch(editUser(user.id, label, value))
    }
  }

  return (
    <>
      <input type='text' value={value} disabled={formDisabled} onChange={e => setValue(e.target.value)}/>
      <span> </span>
      <input type='button' value={buttonText} onClick={buttonClick}/>
      {userFile && userFileButton()}
    </>
  );
};

export default ProfileBox
