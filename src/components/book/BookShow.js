import {FaTrash, FaPencilAlt} from "react-icons/fa";
import {useState} from "react";
import bookImage from '../../images/book.png'
import {Card, Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {deleteBook, uploadBookImage} from "../../features/book/bookSlice";
import ImageModal from "../image/ImageModal";
import {LinkContainer} from "react-router-bootstrap";
import ConfirmModal from "../modals/ConfirmModal";


const BookShow = ({book}) => {
    const [imageModalShow, setImageModalShow] = useState(false);
    const [deleteConfirmModalShow, setDeleteConfirmModalShow] = useState(false);

    const dispatch = useDispatch();

    const handleDeleteClicked = (ev) => {
        ev.preventDefault()
        setDeleteConfirmModalShow(true)
    }

    const handleDeleteConfirmed = () => {
        dispatch(deleteBook(book.id))
    }

    const handleDeleteConfirmModalClose = () => {
        setDeleteConfirmModalShow(false);
    }

    const handleImageClick = (ev) => {
        ev.preventDefault()
        setImageModalShow(true)
    }

    const handleImageUpload = (imageFormData) => {
        if (imageFormData) {
            dispatch(uploadBookImage({id: book.id, imageFormData}))
        }
    }

    const handleImageModalClose = () => {
        setImageModalShow(false);
    }

    return (<>
            <Card style={{width: '16rem'}} className="book-show">
                <span style={{position: "absolute", top: "2px", right: "2px"}}>
                     <LinkContainer to={`/books/update/${book.id}`}>
                         <a href="">
                            <FaPencilAlt/>
                         </a>
                     </LinkContainer>
                    <a onClick={handleDeleteClicked} style={{marginLeft: "5px"}}>
                        <FaTrash/>
                    </a>
                </span>
                <br/>
                <a onClick={handleImageClick}>
                    <Card.Img
                        src={book.image_file_name ? `${process.env.REACT_APP_BASE_API_URL}/books/image/${book.image_file_name}` : bookImage}
                    />
                </a>
                <Card.Title>{book.title}</Card.Title>
            </Card>
            <ImageModal show={imageModalShow}
                        onHide={handleImageModalClose}
                        originalImageSrc={book.image_file_name ? `${process.env.REACT_APP_BASE_API_URL}/books/image/${book.image_file_name}` : bookImage}
                        onImageSelected={handleImageUpload}/>
            <ConfirmModal show={deleteConfirmModalShow}
                onHide={handleDeleteConfirmModalClose}
                title="Delete Warning"
                message={`Are you sure you want to delete "${book.title}"?`}
                yesButtonMessage="Yes, Delete"
                yesAction={handleDeleteConfirmed}/>
        </>)
}

export default BookShow;
