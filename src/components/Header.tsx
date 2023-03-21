import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header(): JSX.Element {
    return (
        <header className='header'>
            <div className='header__container'>
                <Link to={'/'}>
                    <h1 className='header__title'>Search for Books</h1>
                </Link>
            </div>
        </header>
    );
}
export default Header;