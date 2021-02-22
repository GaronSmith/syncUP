const SET_USER = 'session/setUser';

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    }
}


const initialState = {user: null};

const sessionReducer = (state = initialState, action) => {

    let newState;
    switch (action.type){
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload
            return newState
    }
}

export default sessionReducer