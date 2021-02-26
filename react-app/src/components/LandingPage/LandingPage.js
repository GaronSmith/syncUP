import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DateCard from './DateCard/DateCard'


import './LandingPage.css'
import SearchForm from './SearchForm'
import TagButton from './TagButton'

const LandingPage = () => {

    const searchEvents = useSelector(state => state.events.search_results)
    const searchTags = useSelector(state => state.tags.tagResults)
    const [uniqueDates, setUniqueDates] = useState(new Array());

    useEffect(() => {
        if(searchEvents){
            setUniqueDates([...new Set(Object.keys(searchEvents).map(eventId => {
                return searchEvents[eventId].date.split(' ').slice(0,4).join(' ')}
                ))].sort((a,b) => new Date(a) - new Date(b)))
        }
        console.log(searchEvents)
    },[searchEvents])
    
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
                    {searchTags && Object.values(searchTags).map(el => {
                        console.log(el.name)
                        return <TagButton key={el.id} tag={el} />
                    })}
                </div>
            </div>
        </div>

    )
}

export default LandingPage