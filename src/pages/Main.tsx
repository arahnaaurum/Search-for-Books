import React, { useState, MouseEvent } from 'react';
import { useAppSelector } from '../app/hooks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import BookCard from '../components/BookCard';
import Loader from '../components/Loader';
import Search from '../components/Search';
import { fetchMoreBooks } from '../features/books/booksSlice';
import '../styles/Main.css';
import FilterByCategory from '../components/FilterByCategory';


function Main(): JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const bookList = useAppSelector(state => state.book.bookList);
    const status = useAppSelector(state => state.book.status);
    const statusOfLoadMore = useAppSelector(state => state.book.statusOfLoadMore);
    const totalItems = useAppSelector(state => state.book.totalItems);
    const [startIndex, setStartIndex] = useState<number>(30);
    const [loadMoreValue, setLoadMoreValue] = useState<string>('');

    function renderBookCards() {
        return bookList.map((book) => {
            return <BookCard key={book.id} book={book} />
        })
    }

    function handleLoadMore(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        console.log(startIndex);
        dispatch(fetchMoreBooks({ searchValue: loadMoreValue, startIndex: startIndex }));
        setStartIndex(startIndex + 30);
    }

    return (
        <div className='main__container'>
            <Search
                setLoadMoreValue={setLoadMoreValue}
            />

            {status === 'loading' && <Loader />}

            {status === 'idle' && bookList.length !== 0 &&
                <>
                    <h2 className='books__amount'>Books found: <span>{totalItems}</span> </h2>
                    <div className='books__container'>
                        {renderBookCards()}
                    </div>
                    {statusOfLoadMore === 'loading' && <Loader />}
                    <button className='button' onClick={handleLoadMore}>Load more</button>
                </>
            }
            {/* <FilterByCategory/> */}
            {status === 'failed' || statusOfLoadMore === 'failed' && <p>Sorry, something went wrong! Please try again</p>}
        </div>
    )
}

export default Main;