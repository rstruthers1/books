import {useEffect, useState} from "react";
import BookList from "./components/BookList";
import BookCreate from "./components/BookCreate";
import axios from "axios";
import axiosRetry from "axios-retry";



function App() {
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

  return (
      <div className="app">
        <h1>Reading List</h1>
        {bookFetchError ? <div className={"text-danger"}><pre>{bookFetchError}</pre></div> :
            <BookList
                books={books}
                onDelete={deleteBookById}
                onUpdateTitle={updateTitle}
                uploadImageHandler={uploadImageHandler}
            />
        }
        <BookCreate onCreate={createBook}/>
      </div>
  )
}

export default App;
