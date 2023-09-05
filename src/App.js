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
    /*
  const [books, setBooks] = useState([]);
  const [bookFetchError, setBookFetchError] = useState(null)
  function convertEpochToSpecificTimezone(timeEpoch, offset){
    var d = new Date(timeEpoch);
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);  //This converts to UTC 00:00
    var nd = new Date(utc + (3600000*offset));
    return nd.toLocaleString();
  }

  axiosRetry(axios, {
    retries: 1000, // number of retries
    retryDelay: (retryCount) => {
      console.log(`retry attempt: ${retryCount}`);
      //setBookFetchError(null)
      return 5000; // time interval between retries
    },
    retryCondition: (error) => {
      // if retry condition is not specified, by default idempotent requests are retried
      console.log(JSON.stringify(error))
      let lastRequestTimeEpoch = error?.config["axios-retry"]?.lastRequestTime;
      let lastRequestTime = lastRequestTimeEpoch ? convertEpochToSpecificTimezone(lastRequestTimeEpoch, -5) : "";
      const message = `Message: ${error?.message}\nCode: ${error?.code}\nRetry count: ${error?.config["axios-retry"]?.retryCount}\nLast request time: ${lastRequestTime}`
     setBookFetchError(message)
     //setBookFetchError(JSON.stringify(error, null, 2))
      return error?.code === 'ERR_NETWORK' || error?.response?.status === 503;
    },
  });
  
  useEffect(() => {
    const promise = fetchBooks()
  }, [])
  
  const fetchBooks = async() => {
    try {
      const response = await axios.get('http://localhost:8081/books')
      console.log(response)
      setBookFetchError(null)
      setBooks(response.data)
    } catch (ex) {
      console.log(`**** in catch`)
      setBookFetchError(ex.toString())
      console.error(ex)
    }
  }

  const uploadImageHandler = (id, imageFormData) => {
    console.log(imageFormData)
    axios.post(`http://localhost:8081/books/${id}/image`, imageFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res => { 
      console.log(res.statusText)
      fetchBooks().then(result => {
        console.log(result)
      })
    }))
  }

  const deleteBookById = async (id) => {
    const response = await axios.delete(`http://localhost:8081/books/${id}`)
    await fetchBooks()
    // const newBookList = books.filter(book => book.id !== id)
    // setBooks(newBookList)
  }

  const createBook = async (title) => {
    const response = await axios.post('http://localhost:8081/books', {title})
    //setBooks([...books, response.data])
    await fetchBooks();
  }

  const updateTitle = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:8081/books/${id}`, {
      title: newTitle
    })
    console.log(response)
    await fetchBooks()
    
    // const newBookList = books.map(
    //     (book) => book.id === id ? {...book, title: newTitle} :
    //         {...book})
    // setBooks(newBookList)
  }

 */
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
