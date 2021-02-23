const SET_EVENTS = 'events/setEvents'

const setEvents = (events) => {
    return {
        type: SET_EVENTS,
        payload: events
    }
}

export const searchEvents(val) => async (dispatch) => {
    const response = await fetch('/api/events', {
        method:'POST',
        body: JSON.stringify({val})
    })
    if(response.ok){
        const events = await response.json()
        dispatch(setEvents(events))
    }
}

const initialState = { events: null };

const eventsReducer = (state = initialState, action) => {

    let newState;
    switch (action.type) {
        case SET_EVENTS:
            newState = Object.assign({}, state);
            newState.user = action.payload
            return newState
        default:
            return state
    }
}

export default eventsReducer