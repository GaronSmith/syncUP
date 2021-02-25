import { useDispatch } from 'react-redux'
import { removeEvents, setEvents } from '../../../store/events';
import './TagButton.css'

const TagButton = (tag) => {
    const dispatch = useDispatch();

    const onClick = (e) => {
        e.preventDefault()
        let obj
        if(tag.events){
            tag.events.forEach(el => {
                obj[el.id] = el
            })
            dispatch(removeEvents())
            dispatchEvent(setEvents(obj))
        }
    }
    
    return (
        <div className='tag-button__container'>
            <button className= 'tag-button' onClick={onClick}>{tag.name}</button>
        </div>
    )
}

export default TagButton