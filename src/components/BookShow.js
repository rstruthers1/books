import {FaTrash, FaPencilAlt} from "react-icons/fa";
import {useState} from "react";
import BookEdit from "./BoookEdit";
import bookImage from '../images/book.png'
import Button from "react-bootstrap/Button";
import {Modal} from "react-bootstrap";

const BookShow = ({book, onDelete, onUpdateTitle, uploadImageHandler}) => {
  const [editing, setEditing] = useState(false)
  const [show, setShow] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState(book.image_file_name
      ? `http://localhost:8081/books/image/${book.image_file_name}` : bookImage)
  const [imageFormData, setImageFormData] = useState(null)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteClicked = (ev) => {
    ev.preventDefault()
    onDelete(book.id)
  }

  const handleEditClicked = (ev) => {
    ev.preventDefault()
    setEditing(true)
  }

  const titleUpdated = (newBookTitle) => {
    console.log(`set book title to ${newBookTitle}`)
    onUpdateTitle(book.id, newBookTitle)
    setEditing(false)
  }

  const handleImageClick = (ev) => {
    ev.preventDefault()
    setImageFormData(null)
    setModalImageSrc(book.image_file_name
        ? `http://localhost:8081/books/image/${book.image_file_name}` : bookImage)
    handleShow()
  }

  const handleImageChangedInModal = (ev) => {
    const formData = new FormData();
    formData.append("file", ev.target.files[0]);
    setImageFormData(formData)
    console.log(ev.target.files[0])
    const newBookImage = URL.createObjectURL(ev.target.files[0])
    console.log(newBookImage)
    setModalImageSrc(newBookImage)
  }

  const handleImageUpload = (ev) => {
    handleClose()
    if (imageFormData) {
      uploadImageHandler(book.id, imageFormData)
    }
  }

  return (
      <div className="book-show">
        <span style={{position: "absolute", top: "10px", right: "10px"}}>
          {editing ?
              <FaPencilAlt color="grey"/> :
              <a href="" onClick={handleEditClicked}>
                <FaPencilAlt/>
              </a>}

          <a href="" onClick={handleDeleteClicked} style={{marginLeft: "5px"}}>
           <FaTrash/>
          </a>
        </span>
        <br/>
        <a href="" onClick={handleImageClick}>
          <img src={book.image_file_name
              ? `http://localhost:8081/books/image/${book.image_file_name}`
              : bookImage}
         />
        </a>
        {editing ? <BookEdit titleUpdated={titleUpdated}
                             title={book.title}
                             setEditing={setEditing}/> : <h3>{book.title}</h3>}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Upload Book Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={modalImageSrc} alt="{book.title}"/>
            <input type="file" name="file"
                   onChange={handleImageChangedInModal}/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary"
                    onClick={handleImageUpload}
                    disabled={!imageFormData}>
              Update Book Image
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
  )
}

export default BookShow;
