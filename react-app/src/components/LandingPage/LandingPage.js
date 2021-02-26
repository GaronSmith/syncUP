import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DateCard from './DateCard/DateCard'


import './LandingPage.css'
import SearchForm from './SearchForm'
import TagButton from './TagButton'

const LandingPage = () => {

    const searchEvents = useSelector(state => state.events.search_results)
    const searchTags = useSelector(state => state.tags.tagResults)
    const [uniqueDates, setUniqueDates] = useState([]);
    const [tags, setTags] = useState([])

    useEffect(() => {
        if(searchEvents){
            setUniqueDates([...new Set(Object.keys(searchEvents).map(eventId => {
                return searchEvents[eventId].date.split(' ').slice(0,4).join(' ')}
                ))].sort((a,b) => new Date(a) - new Date(b)))
        }
        if(searchTags){
            const rows = [...Array(Math.ceil(Object.values(searchTags).length /2))];
            const tagRows = rows.map((row, idx) => Object.values(searchTags).slice(idx * 2, idx * 2 + 2)); 
            setTags(tagRows)
        }
    },[searchEvents, searchTags])

    
    return (
        <div className='landing__container'>
            <SearchForm />
            <div className='results__container'>
                
                <div className='results__events'>
                    {searchEvents && uniqueDates && uniqueDates.map(date => {
                        const events = Object.values(searchEvents).filter(event => {
                            return event.date.split(' ').slice(0, 4).join(' ') === date
                        })
                        return (
                            <DateCard date={date} 
                            events={events}
                            key={date}
                            />
                        )
                    })}
                </div>
                <div className='results__tags'>
                    <h3 className='tags__title'>Tags</h3>
                    {/* {searchTags && Object.values(searchTags).map(el => {
                        console.log(el.name)
                        return <TagButton key={el.id} tag={el} />
                    })} */}
                    {tags && tags.map((row, idx) => {
                        return <div className='tag__row' key={idx}>
                            {row.map(tag => <TagButton key={tag.id} tag={tag} />)}
                        </div>
                    })}
                </div>
            </div>
        </div>

    )
}

export default LandingPage