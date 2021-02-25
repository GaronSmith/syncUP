import  { useEffect } from 'react';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { removeEvents, searchEvents } from '../../../store/events';
import './SearchForm.css'

const SearchForm = () => {
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('');
    const [searchMyGroups, setSearchMyGroups] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState()

    useEffect(() => {
        
        dispatch(removeEvents())
        if(searchValue){
            dispatch(searchEvents(searchValue))
        }
        
    },[searchValue, dispatch])
    return (
        <div className= 'search__container'>
            <h1 className= 'form__title'>Search for your next syncUP event</h1>
            <form className='search_form'>
                <div className='search__input-container'>
                    <input 
                    type='text' 
                    className='search__input'
                    value= {searchValue}
                    onChange= {(e) => setSearchValue(e.target.value)}
                    />
                </div>
                <div className='search__input-container'>
                    <label className="search__label">Search only my groups</label>
                    <input 
                    type='checkbox' 
                    className='search__input'
                    checked = {Boolean(searchMyGroups)}
                    onChange= {(e) => setSearchMyGroups(!searchMyGroups)}
                    />
                </div>
            </form>
        </div>
    )
}

export default SearchForm