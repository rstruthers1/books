import {FaTrash, FaPencilAlt} from "react-icons/fa";
import {useState} from "react";
import BookEdit from "./BoookEdit";
import bookImage from '../../images/book.png'
import Button from "react-bootstrap/Button";
import {Card, Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {deleteBook, uploadBookImage} from "../../features/book/bookSlice";

const BookShow = ({book}) => {
  const [editing, setEditing] = useState(false)
  const [show, setShow] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState(book.image_file_name
      ? `${process.env.REACT_APP_BASE_API_URL}/books/image/${book.image_file_name}` : bookImage)
  const [imageFormData, setImageFormData] = useState(null)

  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDeleteClicked = (ev) => {
    ev.preventDefault()
    dispatch(deleteBook(book.id))
  }

  const handleEditClicked = (ev) => {
    ev.preventDefault()
    setEditing(true)
  }

  const handleImageClick = (ev) => {
    ev.preventDefault()
    setImageFormData(null)
    setModalImageSrc(book.image_file_name
        ? `${process.env.REACT_APP_BASE_API_URL}/books/image/${book.image_file_name}` : bookImage)
    handleShow()
  }

  const handleImageChangedInModal = (ev) => {
    const formData = new FormData();
    formData.append("file", ev.target.files[0]);
    setImageFormData(formData)
    const newBookImage = URL.createObjectURL(ev.target.files[0])
    setModalImageSrc(newBookImage)
  }

  const handleImageUpload = () => {
    handleClose()
    if (imageFormData) {
      dispatch(uploadBookImage({id: book.id, imageFormData}) )
    }
  }

  return (
      <Card style={{ width: '16rem'}} className="book-show" >
        <span style={{position: "absolute", top: "2px", right: "2px"}}>
          {editing ?
              <FaPencilAlt color="grey"/> :
              <a href="src/components/book/BookShow" onClick={handleEditClicked}>
                <FaPencilAlt/>
              </a>}
          <a href="src/components/book/BookShow" onClick={handleDeleteClicked} style={{marginLeft: "5px"}}>
           <FaTrash/>
          </a>
        </span>
        <br/>
        <a href="src/components/book/BookShow" onClick={handleImageClick}>
          <Card.Img src={book.image_file_name
              ? `${process.env.REACT_APP_BASE_API_URL}/books/image/${book.image_file_name}`
              : bookImage}
         />
        </a>
        
        {editing ? <BookEdit 
            title={book.title}
            setEditing={setEditing} 
            id = {book.id}/> : <Card.Title>{book.title}</Card.Title>}
        
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

      </Card>
  )
}

export default BookShow;
