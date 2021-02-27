const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser'
const ADD_GROUP = 'session/addGroup'
const REMOVE_GROUP = 'session/removeGroup'


export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}

export const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}

export const addGroup = (id) => {
    return {
        type: ADD_GROUP,  
        payload: id
    }
}

export const removeGroup = (id) => {
    return {
        type: REMOVE_GROUP,
        payload: id
    }
}

export const addToGroup = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/groups`, {
        method: 'POST',
        body: JSON.stringify({
            id
        })
    })

    if (res.ok) {
        const user = await res.json()
        dispatch(setUser(user))
    }
}

export const removeFromGroup = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/groups`, {
        method: 'DELETE',
        body: JSON.stringify({
            id
        })
    })

    if (res.ok) {
        const user = await res.json()
        dispatch(setUser(user))
    }
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {

    let newState;
    switch (action.type){
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload
            return newState
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = null;
            return newState;
        default:
            return state
    }
}

export default sessionReducer
