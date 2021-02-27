import React from 'react'
import { useDispatch } from 'react-redux'
import { removeEvents, setEvents } from '../../../store/events';
import './TagButton.css'

const TagButton = ({tag}) => {
    const dispatch = useDispatch();

    const onClick = (e) => {
        e.preventDefault()
        let obj = {}
        if(tag.events){
            tag.events.forEach(el => {
                obj[el.id] = el
            })
            dispatch(removeEvents())
            dispatch(setEvents(obj))
        }
    }
    
    return (
        <div className='tag-button__container'>
            <button className='tag-button' value={tag.name} onClick={onClick}>{tag.name} </button>
        </div>
    )
}

export default TagButton