import {useDispatch, useSelector} from "react-redux";
import BookList from "./BookList";
import {fetchBooks, getBooksError, getBooksStatus, selectAllBooks} from "../../features/book/bookSlice";
import {useEffect} from "react";
import {Container, Row} from "react-bootstrap";


function BookInventory() {
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
        <Container>
            <h1>Books</h1>
            <Row>
                {bookListContent}
            </Row>
        </Container>
    )
}

export default BookInventory;
