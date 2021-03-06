import  { useEffect } from 'react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { removeEvents, searchEvents } from '../../../store/events';
import './SearchForm.css'
import { removeTags, searchTags } from '../../../store/tags';

const SearchForm = () => {
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('');
    const [searchMyGroups, setSearchMyGroups] = useState(false)
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date(2050, 1).toISOString().split('T')[0])

    const user = useSelector(state => state.session.user)

    useEffect(() => {
        const groups = user ? user.groups : null
        dispatch(searchEvents("e", searchMyGroups, groups, startDate, endDate))
        dispatch(searchTags(searchValue))

    }, [])

    const onClick = async (e) => {
        e.preventDefault()
        dispatch(removeEvents())
        dispatch(removeTags())

        const groups = user ? user.groups : null
        dispatch(searchEvents(searchValue, searchMyGroups, groups, startDate, endDate))
        dispatch(searchTags(searchValue))
    }
    return (
        <div className= 'search__container'>
            <h1 className= 'form__title'>Search for your next syncUP event</h1>
            <div className='search-form__container'>
                <form className='search_form'>
                    <div className='search__input-container'>
                        <label className='search__label'>
                            <FontAwesomeIcon className='search__icon' icon={faSearch}/>
                        </label>
                        <input
                            type='text'
                            className='search__input'
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>
                    {user &&
                        <div className='search__input-container'>
                            <label className="search__label">Search only my groups</label>
                            <input
                                type='checkbox'
                                className='search__input'
                                checked={Boolean(searchMyGroups)}
                                onChange={(e) => setSearchMyGroups(!searchMyGroups)}
                            />
                        </div>
                    }
                    
                    <div className='search__input-container'>
                        <label className="search__label">Start Date</label>
                        <input
                            type='date'
                            className='search__input'
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className='search__input-container'>
                        <label className="search__label">End Date</label>
                        <input
                            type='date'
                            className='search__input'
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div className='search__input-container'>
                        <button id='button' className='form__field form__button search__input' onClick={onClick} type="submit">Search</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SearchForm
