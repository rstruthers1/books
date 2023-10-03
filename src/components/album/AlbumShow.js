import {Card} from "react-bootstrap";
import albumImage from "../../images/cd.png";
import {FaPencilAlt, FaTrash} from "react-icons/fa";
import {useDeleteAlbumMutation, useUploadAlbumImageMutation} from "../../services/AlbumApi";
import {LinkContainer} from "react-router-bootstrap";
import ImageModal from "../image/ImageModal";
import {useState} from "react";
import ConfirmModal from "../modals/ConfirmModal";

const AlbumShow = ({album}) => {
    const [deleteAlbum, {isLoading}] = useDeleteAlbumMutation();
    const [uploadAlbumImage] = useUploadAlbumImageMutation();
    const [imageModalShow, setImageModalShow] = useState(false);
    const [deleteConfirmModalShow, setDeleteConfirmModalShow] = useState(false);

    const handleDeleteClicked = (ev) => {
        ev.preventDefault()
        setDeleteConfirmModalShow(true)
    }

    const handleDeleteConfirmed = () => {
        deleteAlbum(album.id);
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
            console.log(`Time to upload form data`)
            console.log(imageFormData)
            uploadAlbumImage({id: album.id, imageFormData: imageFormData})
        }
    }

    const handleImageModalClose = () => {
        setImageModalShow(false);
    }


    return (
        <>
            <Card style={{width: '16rem'}} className="book-show">
             <span style={{position: "absolute", top: "2px", right: "2px"}}>
                 <LinkContainer to={`/albums/update/${album.id}`}>
                     <a href="">
                        <FaPencilAlt/>
                      </a>
                 </LinkContainer>
                 <a href="" onClick={handleDeleteClicked} style={{marginLeft: "5px"}}>
                    <FaTrash/>
                 </a>
             </span>
                <a onClick={handleImageClick}>
                    <Card.Img
                        src={album.image_file_name ? `${process.env.REACT_APP_BASE_API_URL}/albums/image/${album.image_file_name}` : albumImage}
                    />
                </a>
                <Card.Title>{album.name}</Card.Title>
            </Card>
            <ImageModal show={imageModalShow}
                        onHide={handleImageModalClose}
                        originalImageSrc={album.image_file_name ? `${process.env.REACT_APP_BASE_API_URL}/albums/image/${album.image_file_name}` : albumImage}
                        onImageSelected={handleImageUpload}/>
            <ConfirmModal show={deleteConfirmModalShow}
                          onHide={handleDeleteConfirmModalClose}
                          title="Delete Warning"
                          message={`Are you sure you want to delete "${album.name}"?`}
                          yesButtonMessage="Yes, Delete"
                          yesAction={handleDeleteConfirmed}/>
        </>
    )
}

export default AlbumShow;
