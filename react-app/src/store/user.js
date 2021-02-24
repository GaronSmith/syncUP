import axios from 'axios';
// Action Constants

export const SET_OPTION = 'users/SET_OPTION'

//Action Creators

const setUserOption = (user) => {
  return {
    type: SET_OPTION,
    payload: user
  }
}

//Thunk Creators

export const editUser = (userId, column, val) => async (dispatch) => {
  const opts = {
    method: 'put',
    body: JSON.stringify({column, val})
  }
  const response = await fetch(`/api/users/${userId}`, opts);
  if(response.ok) {
    const user = await response.json();
    console.log(user)
    dispatch(setUserOption(user))
  }
}

export const uploadUserImage = (imageFile) => async () => {

  if(!imageFile) return;

  const formData = new FormData();

  formData.append("imageFile", imageFile);

  const response = await axios.post(`/api/users/image`, formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  console.log(response.data)
  return response.data;
}

//Reducer

export default function userReducer(state = {}, action){
  let newState = {...state};
  switch(action.type) {
    case SET_OPTION:
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
}
