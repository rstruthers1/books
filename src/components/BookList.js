import {useContext} from "react";
import BooksContext from '../context/books'
import BookShow from "./BookShow";

const BookList = ({books, onDelete, onUpdateTitle, uploadImageHandler}) => {
  const {count, incrementCount} = useContext(BooksContext);
  
  const renderedBooks = books.map(book => {
    return <BookShow 
        key={book.id} 
        book={book}
        onDelete={onDelete}
        onUpdateTitle={onUpdateTitle}
        uploadImageHandler={uploadImageHandler}
    />
  })
  
  return (
      <div className="book-list">
        <div>
        {count}
        <button onClick={incrementCount}>Click</button>
        </div>
        {renderedBooks}
      </div>
  )
}

export default BookList;
