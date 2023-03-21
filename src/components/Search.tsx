import React, { useState, KeyboardEvent, ChangeEvent, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { fetchBooks } from '../features/books/booksSlice';
import '../styles/Search.css';

type SearchProps = {
    setLoadMoreValue: React.Dispatch<React.SetStateAction<string>>;
}

function Search({ setLoadMoreValue }: SearchProps): JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const [searchValue, setSearchValue] = useState<string>('');
    const [category, setCategory] = useState<string | undefined>();
    const [orderBy, setOrderBy] = useState<string | undefined>();
    const categories = ['Art', 'Biography', 'Computers', 'History', 'Medical', 'Poetry'];

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value);
        setLoadMoreValue(e.target.value);
    }

    function handleSubmit(e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) {
        e.preventDefault();
        dispatch(fetchBooks({ searchValue: searchValue, startIndex: 0, category: category, orderBy: orderBy }));
    }

    return (
        <>
            <label className='search__form'>
                <input
                    className='search__input'
                    type='text'
                    placeholder='Your request'
                    value={searchValue}
                    onChange={handleChange}
                    onKeyDown={
                        (e) => {
                            if (e.keyCode === 13) {
                                handleSubmit(e);
                            }
                        }
                    }
                />
                <button className='button' onClick={handleSubmit}>Search</button>
            </label>
            <div className='filters_container'>
                <div className='filter_container'>
                    <p>Categories:</p>
                    <select className='filter' onChange={(e) => { e.target.value !== 'All' ? setCategory(e.target.value) : setCategory(undefined) }}>
                        <option>All</option>
                        {categories.map((category) => {
                            return <option key={category} value={category}>{category}</option>
                        })
                        }
                    </select>
                </div>
                <div className='filter_container'>
                    <p>Sorting by:</p>
                    <select className='filter' onChange={(e) => setOrderBy(e.target.value)}>
                        <option>Relevance</option>
                        <option>Newest</option>
                    </select>
                </div>
            </div>
        </>
    );
}
export default Search;