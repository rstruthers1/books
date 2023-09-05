
import BookShow from "./BookShow";

const BookList = ({books, onDelete, onUpdateTitle, uploadImageHandler}) => {

  
  const renderedBooks = books ? books.map(book => {
    return <BookShow 
        key={book.id} 
        book={book}
        onDelete={onDelete}
        onUpdateTitle={onUpdateTitle}
        uploadImageHandler={uploadImageHandler}
    />
  }) : []
  
  return (
      <div className="book-list">
        {renderedBooks}
      </div>
  )
}

export default BookList;
