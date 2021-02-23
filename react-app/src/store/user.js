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
    method: 'update',
    body: JSON.stringify({column, val})
  }
  const response = await fetch(`/api/users/${userId}`);
  if(response.ok) {
    dispatch(setUserOption(response.data))
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
