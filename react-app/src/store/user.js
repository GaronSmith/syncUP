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
