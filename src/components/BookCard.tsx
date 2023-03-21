import { Link } from 'react-router-dom';
import { Book } from '../app/type';
import '../styles/BookCard.css';

type BookCardProps = {
    book: Book
}

function BookCard({ book }: BookCardProps): JSX.Element {
    let title = book.volumeInfo?.title? book.volumeInfo?.title : ' ';
    if (title.length > 20) {
        title = title.slice(0, 20) + '...';
    };

    return (
        <div className='card__container'>
            <Link to={`/book/${book.id}`}>
                <h3 className='card__title'>{title}</h3>
                <img
                    className='card__image'
                    src={book.volumeInfo?.imageLinks?.thumbnail? book.volumeInfo?.imageLinks?.thumbnail : '/books.jpg'}
                    alt="cover"
                />
                <p className='card__category'> {book.volumeInfo?.categories? book.volumeInfo.categories[0] : null}</p>
                <div className='card__authors'>{book.volumeInfo?.authors?.map((author, i)=> {return <p key={i}> {author}</p>})}</div>
            </Link>
        </div>
    );
}
export default BookCard;