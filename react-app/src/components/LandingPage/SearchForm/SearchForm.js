import { useState } from 'react'
import './SearchForm.css'

const  SearchForm = () => {
    const [searchValue, setSearchValue] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState()
    return (
        <div className= 'search__container'>
            <h1 className= 'form__title'>Search for your next syncUP event</h1>
            <form className='search_form'>
                <div className='search__input-container'>
                    <input 
                    type='text' 
                    className='search__input'
                </div>
            </form>
        </div>
    )
}

export default SearchForm