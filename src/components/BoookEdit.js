import {useState} from "react";
import Button from "react-bootstrap/Button";

const BookEdit = ({titleUpdated, title, setEditing}) => {
  const [newTitle, setNewTitle] = useState(title)
  
  const handleChange = (ev) => {
    setNewTitle(ev.target.value)
  }
  
  const handleSubmit = (ev) => {
    ev.preventDefault()
    titleUpdated(newTitle)
  }
  
  const handleCancel = (ev) => {
    setEditing(false)
  }
  
  return (
      <form className="book-edit" onSubmit={handleSubmit}>
        
        <input className="input" onChange={handleChange} value={newTitle}/>
        <div>
        <Button className="button" onClick={handleCancel}>Cancel</Button>
        <Button variant="primary" className="button is-primary">Save</Button>
        </div>
      </form>
  )
}

export default BookEdit;
