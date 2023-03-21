import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { useAppSelector } from "../app/hooks";
import { filterBooks } from "../features/books/booksSlice";

function FilterByCategory(): JSX.Element {
    const dispatch = useDispatch<AppDispatch>();
    const bookList = useAppSelector(state => state.book.bookList);
    const [category, setCategory] = useState<string | undefined>();
    const categories = ['Art', 'Biography', 'Computers', 'History', 'Medical', 'Poetry'];

    useEffect(()=>{
        if (category) {
            const filteredBooks = bookList.filter((book)=>{return book.volumeInfo?.categories?.includes(category)});
            dispatch(filterBooks(filteredBooks));
        }
        
    }, [category])

    return (
        <>
            <p>Filter the found books by category:</p>
            <select className='filter' onChange={(e) => { e.target.value !== 'All' ? setCategory(e.target.value) : setCategory(undefined) }}>
                <option>All</option>
                {categories.map((category) => {
                    return <option key={category} value={category}>{category}</option>
                })
                }
            </select>
        </>
    )
}

export default FilterByCategory;