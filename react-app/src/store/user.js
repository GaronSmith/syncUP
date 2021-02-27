import axios from 'axios';
// Action Constants

// export const SET_OPTION = 'users/SET_OPTION'
export const ADD_GROUP = '/users/ADD_GROUP'
export const REMOVE_GROUP = '/users/REMOVE_GROUP'
const SET_USER = '/users/SET_USER'

//Action Creators

// const setUserOption = (user) => {
//   return {
//     type: SET_OPTION,
//     payload: user
//   }
// }

const setUser = (user) => {
  return {
    type: SET_USER,
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
    dispatch(setUser(user))
  }
}

export const getUser = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`);
  if(response.ok) {
    const user = await response.json();
    dispatch(setUser(user));
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
  return response.data;
}


//Reducer

export default function userReducer(state = {}, action){
  let newState = {...state};
  switch(action.type) {
    // case SET_OPTION:
    //   newState = action.payload;
    //   return newState;
    case SET_USER:
      newState = action.payload;
      return newState
    default:
      return state;
  }
}
