const initialState = {group: {}}

const GET_GROUPS = 'groups/getGroups'
const GET_ONE_GROUP = 'groups/getOneGroup'


export const getGroups = (payload) => {
    return {
        type: GET_GROUPS,
        payload
    }
}

export const getOneGroup = (group) => {
    return {
        type: GET_ONE_GROUP,
        payload: group
    }
}


export const getAll = () => async (dispatch) => {
    const res = await fetch('/api/groups/');

    if(res.ok) {
        const groups = await res.json()
        dispatch(getGroups(res.data.groups))
    }
}


export const getOne = (id) => async (dispatch) => {
    const res = await fetch(`/api/groups/${id}`);

    if(res.ok) {
       const group = await res.json()
        dispatch(getOneGroup(group))
    }
}

const groupReducer = (state = initialState, action) => {
    let newState

    switch(action.type) {
        case GET_ONE_GROUP:
            newState = Object.assign({}, state)
            newState.group = action.payload
            return newState

        default:
            return state
    }
}

export default groupReducer
