const SET_EVENTS = 'events/setEvents'
const REMOVE_EVENTS = 'events/removeEvents'

export const setEvents = (events) => {
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


export const searchEvents = (val, bool, groups, start_date, end_date) => async (dispatch) => {
    const response = await fetch('/api/events/', {
        method:'POST',
        body: JSON.stringify({val, start_date, end_date})
    })
    if(response.ok){
        const events = await response.json()
        let obj = {}
        if(bool && groups){
                Object.keys(events.events).forEach(el => {
                    if (groups.indexOf(events.events[el].group_id) !== -1) {
                        obj[events.events[el].id] = events.events[el]
                    }
                })
            
        } else{
            Object.keys(events.events).forEach(el => {
                obj[events.events[el].id] = events.events[el]
            })
        }
        
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