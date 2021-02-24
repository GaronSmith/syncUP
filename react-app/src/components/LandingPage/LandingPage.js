import React from 'react'
import { useSelector } from 'react-redux'

import './LandingPage.css'
import SearchForm from './SearchForm'

const LandingPage = () => {

    const searchEvents = useSelector(state => state.events.search_results)
    
    return (
        <div className='landing__container'>
            <SearchForm />
            <div className='results_container'>
                <div className='results__events'>

                </div>
                <div className='results__tags'>
                    
                </div>
            </div>
        </div>

    )
}

export default LandingPage