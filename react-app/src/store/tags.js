const SET_TAGS = 'tags/setTags'
const REMOVE_TAGS = 'tags/removeTags'

const setTags = (tags) => {
    return {
        type: SET_TAGS,
        payload: tags
    }
}

export const removeTags = () => {
    return {
        type: REMOVE_TAGS
    }
}

export const searchTags = (val) => async (dispatch) => {
    const response = await fetch('/api/events/tags', {
        method:'POST',
        body: JSON.stringify({val})
    })

    if (response.ok) {
        const tags = await response.json()
        var obj = {}
        Object.keys(tags.tags).forEach(el => {
            obj[tags.tags[el].id] = tags.tags[el]
        })
    }
    dispatch(setTags(obj))
}

const initialState = {tagResults: null}

const tagsReducer = (state=initialState, action) => {
    let newState
    switch (action.type) {
        case SET_TAGS:
            newState = Object.assign({}, state);
            newState.tagResults = action.payload
            return newState
        case REMOVE_TAGS:
            newState = Object.assign({}, state);
            newState.tagResults = null
            return newState
        default:
            return state
    }
}

export default tagsReducer