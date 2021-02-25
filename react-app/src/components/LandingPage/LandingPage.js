import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DateCard from './DateCard/DateCard'
import EventsCard from './EventsCard/EventsCard'

import './LandingPage.css'
import SearchForm from './SearchForm'

const LandingPage = () => {

    const searchEvents = useSelector(state => state.events.search_results)
    const user = useSelector(state => state.session.user)
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
            <div className='results_container'>
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
                    
                </div>
            </div>
        </div>

    )
}

export default LandingPage