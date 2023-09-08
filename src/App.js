import {useDispatch, useSelector} from "react-redux";
import BookList from "./components/BookList";
import BookCreate from "./components/BookCreate";
import {fetchBooks, getBooksError, getBooksStatus, selectAllBooks} from "./features/book/bookSlice";
import {useEffect} from "react";

function App() {
    const dispatch = useDispatch();
    const books = useSelector(selectAllBooks);
    const bookStatus = useSelector(getBooksStatus);
    const error = useSelector(getBooksError);

    useEffect(() => {
        if (bookStatus === 'idle') {
            dispatch(fetchBooks());
        }
    }, [bookStatus, dispatch]);

    let bookListContent = '';
    if (bookStatus === 'loading') {
        bookListContent = <h2>Loading...</h2>
    } else if (bookStatus === 'succeeded') {
        bookListContent = <BookList books={books}/>
    } else if (bookStatus === 'failed') {
        bookListContent = <p>{error}</p>;
    }

  return (
      <div className="app">
        <h1>Reading List</h1>
          {bookListContent}
        <BookCreate />
      </div>
  )
}

export default App;
