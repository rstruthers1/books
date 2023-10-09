import {FaTrash, FaPencilAlt} from "react-icons/fa";
import {useState} from "react";
import videoImage from '../../images/video.png'
import {Card} from "react-bootstrap";
import ImageModal from "../image/ImageModal";
import {LinkContainer} from "react-router-bootstrap";
import ConfirmModal from "../modals/ConfirmModal";


const VideoShow = ({video}) => {
    const [imageModalShow, setImageModalShow] = useState(false);
    const [deleteConfirmModalShow, setDeleteConfirmModalShow] = useState(false);

    const handleDeleteClicked = (ev) => {
        ev.preventDefault()
        setDeleteConfirmModalShow(true)
    }

    const handleDeleteConfirmed = () => {
       // dispatch(deleteVideo(book.id))
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
           // dispatch(uploadBookImage({id: book.id, imageFormData}))
        }
    }

    const handleImageModalClose = () => {
        setImageModalShow(false);
    }

    return (<>
            <Card style={{width: '16rem'}} className="book-show">
                <span style={{position: "absolute", top: "2px", right: "2px"}}>
                     <LinkContainer to={`/videos/update/${video.id}`}>
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
                        src={video.image_file_name ? `${process.env.REACT_APP_BASE_API_URL}/videos/image/${video.image_file_name}` : videoImage}
                    />
                </a>
                <Card.Title>{video.title}</Card.Title>
            </Card>
            <ImageModal show={imageModalShow}
                        onHide={handleImageModalClose}
                        originalImageSrc={video.image_file_name ? `${process.env.REACT_APP_BASE_API_URL}/books/image/${video.image_file_name}` : videoImage}
                        onImageSelected={handleImageUpload}/>
            <ConfirmModal show={deleteConfirmModalShow}
                onHide={handleDeleteConfirmModalClose}
                title="Delete Warning"
                message={`Are you sure you want to delete "${video.title}"?`}
                yesButtonMessage="Yes, Delete"
                yesAction={handleDeleteConfirmed}/>
        </>)
}

export default VideoShow;
