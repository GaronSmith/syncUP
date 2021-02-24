const SET_EVENTS = 'events/setEvents'
const REMOVE_EVENTS = 'events/removeEvents'

const setEvents = (events) => {
    return {
        type: SET_EVENTS,
        payload: events
    }
}

export const removeEvents = () => {
    return {
        type: REMOVE_EVENTS,
    }
}

export const searchEvents = (val) => async (dispatch) => {
    const response = await fetch('/api/events/', {
        method:'POST',
        body: JSON.stringify({val})
    })
    if(response.ok){
        const events = await response.json()
        console.log(events)
        let obj = {}
        Object.keys(events.events).forEach(el => {
            obj[events.events[el].id] = events.events[el]
        })
        dispatch(setEvents(obj))
    }
}

const initialState = { search_results: null };

const eventsReducer = (state = initialState, action) => {

    let newState;
    switch (action.type) {
        case SET_EVENTS:
            newState = Object.assign({}, state);
            newState.search_results = action.payload
            return newState
        case REMOVE_EVENTS:
            newState = Object.assign({}, state);
            newState.search_results = null
            return newState
        default:
            return state
    }
}

export default eventsReducer