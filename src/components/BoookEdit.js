import {useState} from "react";
import Button from "react-bootstrap/Button";
import {useDispatch} from "react-redux";
import {updateBook} from "../features/book/bookSlice";

const BookEdit = ({id, title, setEditing}) => {
    const [newTitle, setNewTitle] = useState(title)

    const dispatch = useDispatch();
    
    const handleChange = (ev) => {
        setNewTitle(ev.target.value)
    }

    const updateContent = () => {
        dispatch(updateBook({id: id, title: newTitle}))
            .unwrap()
            .then(response => {
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleSubmit = (ev) => {
        ev.preventDefault()
        setEditing(false);
        updateContent()
    }

    const handleCancel = (ev) => {
        setEditing(false)
    }

    return (
        <form className="book-edit" onSubmit={handleSubmit}>

            <input className="input" onChange={handleChange} value={newTitle}/>
            <div>
                <Button className="button" onClick={handleCancel}>Cancel</Button>
                <Button variant="primary" className="button is-primary" onClick={handleSubmit}>Save</Button>
            </div>
        </form>
    )
}

export default BookEdit;
