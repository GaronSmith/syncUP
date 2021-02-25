const SET_TAGS = 'tags/setTags'

const setTags = (tags) => {
    return {
        type: setTags,
        payload: tags
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

const initialState = {tags: null}

const tagsReducer = (state=initialState, action) => {
    let newState
    switch (action.type) {
        case SET_TAGS:
            newState = Object.assign({}, state);
            newState.tagResults = action.payload
            return newState
        default:
            return state
    }
}

export default tagsReducer