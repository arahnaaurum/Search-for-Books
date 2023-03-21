import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import '../styles/Book.css';

function Book(): JSX.Element {
    const { id } = useParams();
    const bookList = useAppSelector(state => state.book.bookList);
    const book = bookList.find((item) => { return id === item.id });

    return (
        <div className='book__container'>
            <h2 className='book__title'>{book?.volumeInfo?.title}</h2>
            <section className='book__content'>
                <img className='book__cover' src={book?.volumeInfo?.imageLinks?.thumbnail? book?.volumeInfo?.imageLinks?.thumbnail : '/books.jpg'} alt="cover" />
                <div className='book__info'>
                    <p>{book?.volumeInfo.description}</p>
                    <div className='book__info_description'>
                        <span>By: </span>
                        {book?.volumeInfo?.authors?.map((author, i) => { return <p key={i}> {author}</p> })}
                    </div>
                    <div className='book__info_description'>
                        <span>Categories: </span>
                        {book?.volumeInfo?.categories?.map((category, i) => { return <p key={i}> {category}</p> })}
                    </div>
                </div>
            </section>
            <Link to={'/'}><button className='button'>Return</button></Link>
        </div>
    )
}

export default Book;