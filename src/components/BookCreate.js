import {useState} from "react";

const BookCreate = ({onCreate}) => {
  const [title, setTitle] = useState('');
  
  const handleChange = (ev) => {
    setTitle(ev.target.value)
  }
  
  const handleSubmit = (ev) => {
    ev.preventDefault();
    onCreate(title);
    setTitle('')
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
