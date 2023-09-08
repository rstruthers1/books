import {useState} from "react";
import {useDispatch} from "react-redux";
import {createBook} from "../features/book/bookSlice";

const BookCreate = () => {
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();
  
  const handleChange = (ev) => {
    setTitle(ev.target.value)
  }
  
  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(createBook(title))
    .unwrap()
    .then(response => {
      console.log(response);
      setTitle('')
    })
    .catch(e => {
      console.log(e);
    });
  }
  return (
      <div className={"book-create"}>
        <h3>Add a Book</h3>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
        <input className="input" type="text" onChange={handleChange} value={title}/>
        <button className="button">Create</button>
        </form>
      </div>
  )
}

export default BookCreate;
