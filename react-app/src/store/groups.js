import axios from 'axios'


const initialState = {group: {}}

const GET_GROUPS = 'groups/getGroups'
const GET_ONE_GROUP = 'groups/getOneGroup'
const ADD_USER = 'groups/addOneMember'

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

const addOneMember = (user) => {
    return {
        type: ADD_USER,
        payload: user
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

export const addMember = (id) => async (dispatch) => {
    const res = await axios.post(`/api/groups/${id}`)

    console.log(res.data)

    return res.data
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
