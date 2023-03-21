import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './pages/Main';
import Book from './pages/Book';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path='/book/:id' element={<Book />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
