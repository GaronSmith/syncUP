import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { editUser, uploadUserImage } from '../../store/user'

function ProfileBox({label, content, userFile}) {
  let [buttonText, setButtonText] = useState('Edit');
  let [value, setValue] = useState(content);
  let [formDisabled, setFormDisabled] = useState(true);
  let [imageFile, setImageFile] = useState(null)
  let user = useSelector(state => state.user)
  const { id } = useParams();
  const dispatch = useDispatch();
  const initialValue = content;

  useEffect(() => {
    setValue(content)
  }, [content])

  const buttonClick = () => {
    const imgButton = document.getElementById('imageButton');
    //The editor is not active.
    if(formDisabled) {
      setFormDisabled(false);
      if(userFile) {
        imgButton.disabled = false;
      }
      setButtonText('Confirm');
    //The editor is active. Clicking this will dispatch a thunk to actually change the database.
    } else {
      setFormDisabled(true);
      setButtonText('Edit');
      if(userFile) {
        imgButton.disabled = true;
      }
      if(value === initialValue) return;
      dispatch(editUser(user.id, label, value))
    }
  }

  const userFileSubmit = (e) => {
    setImageFile(e.target.files[0]);
  }

  //We are checking if the image file has changed. If it has, it's time to send an upload.
  useEffect(() => {
    async function fetchUrl() {
      const imgUrl = await dispatch(uploadUserImage(imageFile))
      setValue(imgUrl);
    }
    if(imageFile)
      fetchUrl();

  },[imageFile, dispatch])

  function userFileButton() {
    return (
    <>
      <span> </span>
      <input
        type='file'
        onChange={userFileSubmit}
        name='imageFile'
        id='imageButton'
        // disabled
      />
    </>
    );
  };
  return (
    <>
      <input class='profile__field' type='text' value={value} disabled={formDisabled} onChange={e => setValue(e.target.value)}/>
      { id === 'me' &&
      <>
      <span> </span>
      <input type='button' value={buttonText} onClick={buttonClick}/>
      {userFile && userFileButton()}
      </>}
    </>
  );
};

export default ProfileBox
