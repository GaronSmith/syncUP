const SET_EVENT = 'event/setEvent';
const REMOVE_EVENT = 'event/removeEvent';

export const setEvent = (event) => {
  return {
    type: SET_EVENT,
    payload: event,
  }
}

export const removeEvent = () => {
  return {
    type: REMOVE_EVENT,
  }
}

export const getEvent = (id) => async (dispatch) => {
  const res = await fetch(`/api/events/${id}`);

  if(res.ok) {
    const jsonData = await res.json()
    dispatch(setEvent(jsonData));
  }

};

export const joinEvent = (userId, eventId) => async (dispatch) => {
  const res = await fetch(`/api/events/${eventId}`, {
    method:'POST',
    body: JSON.stringify({userId, eventId})
  })

  if (res.ok) {
    const jsonData = await res.json()
    dispatch(setEvent(jsonData));
  }
}

const initialState = null;

const eventReducer = ( state = initialState, action ) => {
  let newState;
  switch(action.type) {
    case SET_EVENT:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    case REMOVE_EVENT:
      newState = Object.assign({}, state);
      newState = null;
      return newState;
    default:
      return state;
  }
}

export default eventReducer;
